from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from ...common.common import Base

# Modelo BDD
class Reserva(Base):
    __tablename__ = "reservas"
    id=Column(Integer, primary_key=True)
    dia=Column(Date)
    hora=Column(Time)
    duracion=Column(Integer)
    tel=Column(String(15))
    contacto=Column(String(100))
    cancha_id = Column(Integer, ForeignKey('canchas.id'))

    cancha= relationship("Cancha", back_populates="reservas", uselist=False)



