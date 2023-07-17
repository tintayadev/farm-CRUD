from pydantic import BaseModel, Field
from typing import Optional
from bson  import ObjectId

class PyObjectID(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
        
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid objectId')
        return str(v)
class Task(BaseModel):
    id: Optional[PyObjectID] = Field(alias='_id')
    title: str
    description: Optional[str] = None
    completed: bool = False 

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}

class UpdateTask(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}