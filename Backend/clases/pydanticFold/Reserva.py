from pydantic import BaseModel 
from datetime import date, time
from typing import Optional

# Modelo de validacion
class ReservaBase(BaseModel):  
    dia: date
    hora: time
    duracion: int
    tel: str
    contacto: str   
    cancha_id: int

class ReservaCreate(ReservaBase):
    pass

class Reserva(BaseModel): 
    message: str
    data: ReservaBase
    status: int

class ReservaQuery(BaseModel):
    message: str
    data: list[ReservaBase]
    status: int

class ReservaUpdate(BaseModel): 
    dia: Optional[date] = None 
    hora: Optional[time] = None 
    duracion: Optional[int] = None 
    tel: Optional[str] = None 
    contacto: Optional[str] = None 
    cancha_id: Optional[int] = None