from typing import Optional

from pydantic import BaseModel, Field

from .common import Message, RuleRef


class FiveElements(BaseModel):
    wood: int
    fire: int
    earth: int
    metal: int
    water: int


class Facts(BaseModel):
    five_elements: Optional[FiveElements] = Field(default=None, alias="fiveElements")
    ten_gods: Optional[dict[str, int]] = Field(default=None, alias="tenGods")
    relations: Optional[list[str]] = None
    day_master: Optional[str] = Field(default=None, alias="dayMaster")
    strength: Optional[str] = None

    class Config:
        populate_by_name = True


class UserInput(BaseModel):
    name: Optional[str] = None
    birth_date: Optional[str] = Field(default=None, alias="birthDate")
    birth_time: Optional[str] = Field(default=None, alias="birthTime")
    timezone: Optional[str] = None
    location: Optional[str] = None
    focus: Optional[str] = None

    class Config:
        populate_by_name = True


class Session(BaseModel):
    id: str
    created_at: Optional[str] = Field(default=None, alias="createdAt")

    class Config:
        populate_by_name = True


class Insight(BaseModel):
    id: str
    title: str
    summary: str
    category: Optional[str] = None
    tags: Optional[list[str]] = None
    rule_refs: list[RuleRef] = Field(alias="ruleRefs")

    class Config:
        populate_by_name = True


class ReadingRequest(BaseModel):
    session_id: str = Field(alias="sessionId")
    input: UserInput

    class Config:
        populate_by_name = True


class ChatRequest(BaseModel):
    session_id: str = Field(alias="sessionId")
    message: str

    class Config:
        populate_by_name = True


class ReadingResponse(BaseModel):
    session_id: str = Field(alias="sessionId")
    messages: list[Message]
    insights: list[Insight]
    facts: Optional[Facts] = None

    class Config:
        populate_by_name = True
