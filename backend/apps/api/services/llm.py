import structlog
from openai import AsyncOpenAI, OpenAI
from tenacity import (
    AsyncRetrying,
    Retrying,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from ..config import get_settings

logger = structlog.get_logger(__name__)


class DeepSeekClient:
    """Thin wrapper for DeepSeek via OpenAI SDK."""

    def __init__(self) -> None:
        settings = get_settings()
        self._client = OpenAI(
            api_key=settings.deepseek_api_key,
            base_url=str(settings.deepseek_base_url),
            timeout=settings.deepseek_timeout,
        )
        self._async_client = AsyncOpenAI(
            api_key=settings.deepseek_api_key,
            base_url=str(settings.deepseek_base_url),
            timeout=settings.deepseek_timeout,
        )
        self._model = settings.deepseek_model

    def chat(self, messages: list[dict[str, str]]) -> str:
        for attempt in _retry_policy():
            with attempt:
                resp = self._client.chat.completions.create(model=self._model, messages=messages)
                content = resp.choices[0].message.content or ""
                logger.info("deepseek.chat", attempt=attempt.retry_state.attempt_number)
                return content
        return ""

    async def chat_async(self, messages: list[dict[str, str]]) -> str:
        async for attempt in _async_retry_policy():
            with attempt:
                resp = await self._async_client.chat.completions.create(
                    model=self._model, messages=messages
                )
                content = resp.choices[0].message.content or ""
                logger.info("deepseek.chat_async", attempt=attempt.retry_state.attempt_number)
                return content
        return ""


def _retry_policy():
    return Retrying(
        retry=retry_if_exception_type(Exception),
        wait=wait_exponential(multiplier=0.5, max=4),
        stop=stop_after_attempt(3),
        reraise=True,
    )


def _async_retry_policy():
    return AsyncRetrying(
        retry=retry_if_exception_type(Exception),
        wait=wait_exponential(multiplier=0.5, max=4),
        stop=stop_after_attempt(3),
        reraise=True,
    )
