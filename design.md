Fortune Oracle — System Design
1. 设计目标（Design Goals）

Fortune Oracle 的设计目标不是构建一个“算命应用”，
而是实现一个 基于传统隐喻体系的结构化解释系统。

系统应当满足以下核心目标：

结构优先
所有解释必须基于明确的结构化数据，而非即兴生成。

规则显式化
所有判断依据必须可以追溯到具体规则与来源。

语言与逻辑解耦
大模型仅负责语言表达，不参与事实或规则生成。

可验证、可审计
系统输出应具备一致性检查与边界控制能力。

工程可演进性
支持规则扩展、Agent 扩展与前端能力演进。

2. 非目标（Non-Goals）

以下内容明确不在本项目目标范围内：

未来事件预测

人生“吉凶好坏”裁决

超自然能力模拟

心理、医疗、法律建议替代

高并发、低延迟服务优化（非瓶颈）

3. 技术选型概览
后端

语言：Python

框架：FastAPI

数据建模：Pydantic

模型调用：HTTP API（OpenAI / Claude / Local LLM）

架构风格：模块化 + 轻量多 Agent

前端

语言：TypeScript

框架：React

构建工具：Vite

样式：TailwindCSS

状态管理：Zustand

动效：Framer Motion

图表：Recharts

4. 系统整体架构

Fortune Oracle 采用分层架构，避免“Prompt 即系统”的不可控设计。

User
  ↓
API Layer
  ↓
Session & Memory
  ↓
Deterministic Engine
  ↓
Rules & Sources
  ↓
Interpretation (LLM)
  ↓
Validation / Boundary Control
  ↓
Response & Insights

5. 后端架构设计
5.1 模块划分
apps/api/
  main.py                 # FastAPI 应用入口
  routers/                # HTTP 路由
  engines/                # 确定性计算引擎
  rules/                  # 规则加载与匹配
  agents/                 # Agent 实现
  schemas/                # Pydantic 数据模型
  services/               # LLM / 存储等基础服务

5.2 确定性计算引擎（Deterministic Engine）

职责：

接收规范化输入（出生信息等）

输出确定性、结构化事实

不依赖任何大模型

示例输出（概念）：

{
  "five_elements": {"wood":2,"fire":1,"earth":3,"metal":1,"water":1},
  "day_master": "earth",
  "strength": "weak",
  "relations": ["conflict", "combination"]
}

5.3 规则与来源层（Rules & Sources）

规则以数据形式存在，而不是写死在 Prompt 中。

规则最小结构：

rule_id: R-BZ-203
statement: >
  当结构中外部责任较多而核心承载能力较弱时，
  容易出现压力集中现象。
source:
  book: 子平真诠
  ref: 某章节索引
version: v1


规则层职责：

加载规则

匹配结构化事实

输出可引用的 rule_id 集合

5.4 Agent 设计
IntakeAgent

校验输入完整性

发现缺失信息

不输出结论

ReadingAgent

输入：facts + rules

输出：结构化洞察草稿（insights）

WriterAgent

将洞察草稿转译为自然语言

禁止新增事实或规则

SkepticAgent

一致性检查

禁止绝对化、宿命化表达

不通过则触发重写或降级输出

5.5 校验与边界控制

系统必须拒绝以下输出：

“一定 / 必然 / 注定”

不可改变的人生结论

未引用规则的判断

超出输入信息范围的推断

6. API 设计概览
创建会话

POST /api/session

提交输入

POST /api/reading/input

对话

POST /api/chat（支持 streaming）

获取结构化洞察

GET /api/session/{id}/insights

API 输出分为两类：

对话文本（Chat）

结构化洞察（Insights，用于前端卡片）

7. 前端架构设计
7.1 设计目标

结构清晰

渐进披露

可解释展示

不依赖“神秘视觉效果”

7.2 页面结构

Landing：进入会话

Session Page：

左侧：对话流

右侧：洞察卡片

7.3 关键组件

ChatStream

InsightPanel

InsightCard

EvidenceDrawer

Charts（五行 / 十神）

7.4 数据驱动 UI

前端不做任何“解释逻辑”，
仅渲染后端提供的结构化结果。

8. 数据契约（Schema First）

前后端通过共享 Schema 对齐：

Python：Pydantic

TypeScript：interface / type

Schema 是系统的真实核心。

9. 可观测性与测试
必要日志

session_id

rule_id 命中情况

Agent 执行路径

校验失败原因

自动校验

输出必须包含 rule_refs

禁止绝对化措辞

facts 与文本一致性

10. 演进方向

规则体系版本化

Agent 执行流程可视化

历史解读对比

解释风格配置化
