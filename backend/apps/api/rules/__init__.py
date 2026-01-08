"""
Rules layer placeholder.
Responsible for loading rules and matching against structured facts.
"""

from dataclasses import dataclass
from typing import Protocol

from ..schemas.reading import Facts, Insight


@dataclass
class RuleHit:
    rule_id: str
    score: float | None = None


class RuleMatcher(Protocol):
    async def match(self, facts: Facts) -> list[RuleHit]:
        ...


class InsightBuilder(Protocol):
    async def build(self, facts: Facts, hits: list[RuleHit]) -> list[Insight]:
        ...
