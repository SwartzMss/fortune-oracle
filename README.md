Fortune Oracle
==============

一个基于传统隐喻体系的结构化解读系统，不做预言、不做裁决，只提供可解释的观察视角。

是什么 / 不是什么
----------------
- ✅ 解释型系统，不替代决策；基于显式规则与来源的结构化解读；强调可解释性、一致性与边界控制；只描述倾向/模式/结构关系。
- ❌ 不预测未来事件、不判吉凶、不宣称不可改变的结论、不提供“应该如何选”的指令。

核心原则
--------
- 描述而非断言：输出结构性描述与可能倾向。
- 客观语言：避免情绪引导或宿命化表达。
- 可解释性优先：每条解读需对应结构化输入、规则定义、来源标识。
- 决策权属用户：系统仅提供观察视角。
- 工程边界：区分确定性计算、规则管理、语言生成。

系统架构（分层）
---------------
用户 → 输入采集 → 确定性计算引擎（无 LLM） → 规则与来源层（显式/可追溯） → 解释 Agent（结构→语言） → 校验/边界控制（反绝对化/一致性） → 响应。

多 Agent 分工（设计）
--------------------
- IntakeAgent：输入校验、规范化；不产出结论。
- ReadingAgent：facts + rules → 洞察草稿（结构化）。
- WriterAgent：LLM 仅做转译，不新增事实或规则。
- SkepticAgent：一致性/越界/绝对化检查。

工程现状
--------
- 前端（frontend/）：Vite + React + TS + Tailwind + Zustand + Recharts + Framer Motion；默认 mock 数据，可切换真实 API（`VITE_MOCK_API=false`，`VITE_API_BASE_URL`）。
- 后端（backend/）：FastAPI 入口、健康检查、基础 Schema 对齐前端；DeepSeek（OpenAI SDK）客户端封装；structlog；占位的 agents/engine/rules 接口。
- 设计文档：`design.md`（目标、非目标、架构、Agent 分工、前端设计原则）。

快速开始
--------
前端
1) `cd frontend && npm install`
2) 开发：`npm run dev -- --host --port 5173`（默认 mock）
3) 构建：`npm run build`
4) 切换真实 API：设置 `VITE_MOCK_API=false`、`VITE_API_BASE_URL=https://your-api`

后端
1) `cd backend && python -m venv .venv && source .venv/bin/activate`
2) `pip install -r requirements.txt`
3) 配置环境：`cp .env.example .env`，填入 `DEEPSEEK_API_KEY`（可选 `DEEPSEEK_BASE_URL`/`MODEL`）
4) 运行：`uvicorn apps.api.main:app --reload --port 8000`
5) 健康检查：`curl http://localhost:8000/api/health`
6) 测试：`pytest`

后续路线
--------
- 填充确定性计算引擎与规则匹配，产出结构化 facts + rule_hits。
- 实现 Intake/Reading/Writer/Skeptic agent 流程，增加输入/解读/对话路由。
- 加入一致性/禁绝对化校验、rule_refs 必填校验。
- 版本化规则体系，完善日志/可观测性、ruff/mypy 检查。
