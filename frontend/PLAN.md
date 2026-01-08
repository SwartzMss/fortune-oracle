前端实现计划（Fortune Oracle）

目标：用 React/Vite/Tailwind 搭建前端，只渲染后端提供的结构化结果（对话 + 洞察），逻辑不下沉到 UI，遵循“结构优先，LLM 只做表述”。

技术栈
- Vite + React + TypeScript
- TailwindCSS + PostCSS + autoprefixer
- Zustand（状态）+ React Query 或简单 fetch 包装（视复杂度选择）
- Framer Motion（动效），Recharts（图表）
- 测试：Vitest + @testing-library/react（轻量覆盖）

目录结构
- frontend/
  - src/
    - api/（HTTP client、类型化接口）
    - store/（Zustand slices）
    - types/（后端 Schema 映射）
    - components/
      - chat/（ChatStream, MessageBubble, InputBar）
      - insights/（InsightPanel, InsightCard, EvidenceDrawer）
      - charts/（FiveElementsChart, TenGodsChart）
      - layout/（AppShell, SplitPane）
    - pages/（LandingPage, SessionPage）
    - lib/（工具：格式化、守卫）
    - assets/（轻量资源）
  - index.html, tailwind.config.js, postcss.config.js, tsconfig.json, vite.config.ts

实施步骤
1) 脚手架：`npm create vite@latest frontend -- --template react-ts`（或 pnpm/yarn）；如需 monorepo，可加 workspace package.json。
2) 安装依赖：`tailwindcss postcss autoprefixer`，`zustand`，`framer-motion`，`recharts`，`clsx`，`ky`（或 axios/fetch 包装），`@tanstack/react-query`（可选推荐），`@testing-library/react @testing-library/user-event vitest jsdom`。
3) Tailwind 配置：初始化 config，设定 content（`./index.html`、`./src/**/*.{ts,tsx}`），`src/index.css` 写基础样式，定义色板变量（信息化、干净中性色 + 适度强调色，避免“神秘风”）。
4) 类型：建立 `src/types/schema.ts`，镜像后端契约（Session, UserInput, Facts, Rule, Insight, Message），后端未定字段用 TODO 标注。
5) HTTP 客户端：`src/api/client.ts`（ky 实例+baseURL）；`src/api/endpoints.ts` 定义接口：
   - POST `/api/session`
   - POST `/api/reading/input`
   - POST `/api/chat`（流式占位）
   - GET `/api/session/{id}/insights`
   支持离线/开发 mock（`MOCK_API=true`）。
6) 状态：`src/store/session.ts`（session id、loading/error），`src/store/chat.ts`（消息列表、发送 action），`src/store/insights.ts`（卡片、拉取 action）；副作用放 thunk，组件只渲染。
7) 布局：`AppShell` 左对话流、右洞察；移动端响应式折叠（tab/手风琴）。Landing 提供创建 session 入口。
8) 组件：
   - ChatStream：MessageBubble 列表；InputBar 发送+loading。
   - InsightPanel：按类别分组；`InsightCard` 展示标题/摘要/rule 引用；`EvidenceDrawer` 展开 rule statement/source。
   - Charts：`FiveElementsChart`、`TenGodsChart`（Recharts），数据存在再渲染。
   - 状态组件：空/错误/校验失败提示。
9) 交互流：
   - 进入：调用 `createSession`，存 sessionId。
   - 提交输入：`/api/reading/input` → 追加对话消息 + 更新 insights store。
   - 继续对话：`/api/chat`（先非流式，后续再开流）。
10) 校验与边界：当 Skeptic 拒绝时展示服务端消息（如“条件不足”）；UI footer/banner 提示“非预言，不判吉凶”。
11) 样式方向：信息优先、克制，轻渐变/阴影；Tailwind + 小型设计令牌（间距、圆角、字号）；卡片挂载/展开用轻量 Framer Motion。
12) 测试：Vitest + jsdom，ChatStream、InsightCard 样例渲染冒烟测试；类型兼容（schema）测试。
13) 工具脚本：npm scripts（`dev`、`build`、`test`、`lint` 若加 eslint）；tsconfig/vite 配置路径别名（`@/components` 等）。
14) 数据样例：`src/lib/fixtures.ts` 放示例 insights/messages，便于无后端开发。

下一步建议
- 运行脚手架并安装依赖。
- 配置 Tailwind 与基础样式。
- 写 types、API client、Zustand store。
- 用 mock 数据搭 AppShell + Chat/Insight 组件。
- 等后端 ready 后接入真实接口，保留 mock 开关。
