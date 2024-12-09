from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from ...common.common import Base

# Modelo BDD
class Cancha (Base):
    __tablename__ = "canchas"
    id=Column(Integer, primary_key=True)
    nombre=Column(String(100))
    techada=Column(Boolean)
    reservas = relationship("Reserva", back_populates="cancha")

