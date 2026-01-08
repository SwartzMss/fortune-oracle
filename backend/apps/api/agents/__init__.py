"""
Agent stubs for multi-step pipeline.
In later phases, implement IntakeAgent, ReadingAgent, WriterAgent, SkepticAgent.
"""

from dataclasses import dataclass
from typing import Protocol


class Agent(Protocol):
    async def run(self, *args, **kwargs):
        ...


@dataclass
class AgentResult:
    ok: bool
    message: str | None = None
