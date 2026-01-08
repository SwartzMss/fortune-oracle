from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


class Message(BaseModel):
    id: str
    role: Literal["user", "assistant", "system"]
    content: str
    created_at: Optional[datetime] = Field(default=None, alias="createdAt")

    class Config:
        populate_by_name = True


class RuleSource(BaseModel):
    book: Optional[str] = None
    ref: Optional[str] = None
    author: Optional[str] = None


class RuleRef(BaseModel):
    rule_id: str = Field(alias="ruleId")
    statement: Optional[str] = None
    source: Optional[RuleSource] = None
    version: Optional[str] = None

    class Config:
        populate_by_name = True
