Fortune Oracle Backend
======================

栈：FastAPI 0.111、Pydantic v2、structlog、OpenAI SDK（DeepSeek）、httpx、tenacity。

快速开始
1) 安装依赖
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
2) 配置环境变量（参考 `.env.example`）
```bash
cp .env.example .env
export DEEPSEEK_API_KEY=sk-...
```
3) 运行开发服务
```bash
uvicorn apps.api.main:app --reload --port 8000
```
4) 健康检查
```bash
curl http://localhost:8000/api/health
```
5) 测试
```bash
pytest
```

目录结构（当前阶段）
- `apps/api/main.py`：FastAPI 入口，CORS/路由注册
- `apps/api/config.py`：Pydantic Settings，DeepSeek 配置
- `apps/api/logging.py`：structlog 配置
- `apps/api/routers/health.py`：健康检查
- `apps/api/schemas/`：基础 schema，与前端对齐
- `apps/api/services/llm.py`：DeepSeek（OpenAI SDK）客户端封装
- `apps/api/agents|engines|rules/`：Agent/引擎/规则占位接口，后续落地
- `tests/`：pytest 示例（健康检查）
