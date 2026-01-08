"""
Deterministic engine placeholder.
Expected to take normalized input and output structured facts without LLM.
"""

from typing import Protocol

from ..schemas.reading import Facts, UserInput


class Engine(Protocol):
    async def compute(self, user_input: UserInput) -> Facts:
        ...
