from ..common.common import session_factory
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from ..clases.pydanticFold.Reserva import ReservaUpdate, ReservaCreate, Reserva, ReservaBase
from ..clases.sqlAlchemy.Reserva import Reserva as SQLAlchemyReserva
from ..clases.sqlAlchemy import Cancha as SQLAlchemyCancha
from typing import List
from datetime import date, timedelta, datetime, time as Time
from sqlalchemy import select, join
from fastapi.middleware.cors import CORSMiddleware
from ..clases.pydanticFold.Reserva import ReservaQuery

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]



app=FastAPI()

app.add_middleware( 
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
    )




#POST



# Crear una Reserva
@app.post("/reservas/", response_model=Reserva)
async def crear_reserva(reserva: ReservaCreate, session: Session = Depends(session_factory)):
    db_reserva = SQLAlchemyReserva(**reserva.model_dump())
    try:
        if db_reserva.dia < date.today() or (db_reserva.dia == date.today() and db_reserva.hora <= datetime.now().time()):
            raise HTTPException(status_code=400, detail="La reserva no puede ser para un día pasado")

         # Convertir la hora de inicio y fin de la nueva reserva
        timedelta_reserva_nueva_inicio = datetime.combine(datetime.today(), reserva.hora)
        reserva_nueva_fin = (timedelta_reserva_nueva_inicio + timedelta(hours=reserva.duracion)).time()
        
        # Obtener todas las reservas existentes para la misma cancha y día 
        reservas_existentes = session.query(SQLAlchemyReserva).filter( 
            SQLAlchemyReserva.cancha_id == reserva.cancha_id, 
            SQLAlchemyReserva.dia == reserva.dia ).all() 
        
        # Verificar si hay conflicto de horario 
        conflicto = 0
        if not (db_reserva.duracion>0):
                conflicto = 1

        if conflicto==0:
            for db_reserv in reservas_existentes: 
                db_reserva_inicio = db_reserv.hora 
                db_reserva_fin = (datetime.combine(
                    datetime.today(), db_reserv.hora) + timedelta(hours=db_reserv.duracion)).time()
            
                if not (reserva_nueva_fin <= db_reserva_inicio or reserva.hora >= db_reserva_fin): 
                    conflicto = 2 
                    break
            
        
        if conflicto==2:
            raise HTTPException(status_code=400, detail="Ya existe una reserva en esa cancha y horario")
        elif conflicto==1:
            raise HTTPException(status_code=400, detail="La duración de la reserva debe ser mayor a 0")
        session.add(db_reserva)
        session.commit()
        session.refresh(db_reserva)
        response ={
            "message": "Reserva creada correctamente",
            "data": db_reserva,
            "status": 201
        }
        return response
    except Exception as e:
        session.rollback()            
        raise HTTPException(status_code=500, detail=str(e))    
    finally:
        session.close()



#GET



# Consultar Reservas por fecha
@app.get("/reservas/fecha/{dia}", response_model=ReservaQuery)
async def obtener_reservas_por_fecha(dia: date, session: Session = Depends(session_factory)):
    try:
        reservas = session.query(SQLAlchemyReserva).filter(SQLAlchemyReserva.dia == dia).order_by(asc(SQLAlchemyReserva.dia), asc(SQLAlchemyReserva.hora)).all()
        reservaQuery={
            "message": "Reservas obtenidas correctamente",
            "data": reservas,
            "status": 200
        }
        return reservaQuery
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        session.close()
# http://127.0.0.1:8000/reservas/fecha/2024-11-02


from sqlalchemy import select, join, asc
from ..clases.sqlAlchemy import Reserva as SQLAlchemyReserva, Cancha as SQLAlchemyCancha
from ..clases.pydanticFold.Reserva import ReservaBase


@app.get("/reservas/nombre/{nombre}", response_model=ReservaQuery)
async def obtener_reservas_por_nombre(nombre: str, session: Session = Depends(session_factory)):
    try:
        stmt = (
            select(SQLAlchemyReserva.dia, SQLAlchemyReserva.hora, 
                   SQLAlchemyReserva.duracion, SQLAlchemyReserva.tel, SQLAlchemyReserva.contacto, SQLAlchemyCancha.nombre, SQLAlchemyReserva.cancha_id)
            .select_from(join(SQLAlchemyReserva, SQLAlchemyCancha, SQLAlchemyReserva.cancha_id == SQLAlchemyCancha.id))
            .where(SQLAlchemyCancha.nombre == nombre).order_by(asc(SQLAlchemyReserva.dia), asc(SQLAlchemyReserva.hora))
            )
        reservas = session.execute(stmt).fetchall() 
        reservaQuery={
            "message": "Reservas obtenidas correctamente",
            "data": reservas,
            "status": 200
        }
        return reservaQuery
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()
# http://127.0.0.1:8000/reservas/nombre/cancha1





#DELETE

# Eliminar una Reserva
@app.delete("/reservas/delete/cancha/{cancha_id}/dia/{dia}/hora/{hora}", response_model=dict)
async def eliminar_reserva(cancha_id: int, dia: date, hora: str, session: Session = Depends(session_factory)):
    try:
        reserva = session.query(SQLAlchemyReserva).filter(SQLAlchemyReserva.cancha_id == cancha_id
                                                          ).filter(SQLAlchemyReserva.dia == dia
                                                                   ).filter(SQLAlchemyReserva.hora == hora).first()
        if reserva is None:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        session.delete(reserva)
        session.commit()
        return {
            "status": 200,
            "message": "Reserva eliminada correctamente"
            }
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()





#PATCH



# Actualizar una Reserva
@app.patch("/reservas/update/cancha/{cancha_id}/dia/{dia}/hora/{hora}", response_model=Reserva)
async def actualizar_reserva(cancha_id: int, dia: date, hora: str, db_reserva: ReservaUpdate, session: Session = Depends(session_factory)):
    try:
        reserva = session.query(SQLAlchemyReserva).filter(SQLAlchemyReserva.cancha_id == cancha_id
                                                          ).filter(SQLAlchemyReserva.dia == dia
                                                                   ).filter(SQLAlchemyReserva.hora == hora).all()
        if reserva is None:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        

        if db_reserva.dia < date.today() or (db_reserva.dia == date.today() and db_reserva.hora <= datetime.now().time()):
            raise HTTPException(status_code=400, detail="La reserva no puede ser para un día pasado")


         # Convertir la hora de inicio y fin de la nueva reserva
        timedelta_reserva_nueva_inicio = datetime.combine(datetime.today(), reserva.hora)
        reserva_nueva_fin = (timedelta_reserva_nueva_inicio + timedelta(hours=reserva.duracion)).time()
        
        # Obtener todas las reservas existentes para la misma cancha y día 
        reservas_existentes = session.query(SQLAlchemyReserva).filter( 
            SQLAlchemyReserva.cancha_id == reserva.cancha_id, 
            SQLAlchemyReserva.dia == reserva.dia ).all() 
        
        # Verificar si hay conflicto de horario 
        conflicto = 0
        if not (db_reserva.duracion>0):
                conflicto = 1

        if conflicto==0:
            for db_reserv in reservas_existentes: 
                db_reserva_inicio = db_reserv.hora 
                db_reserva_fin = (datetime.combine(
                    datetime.today(), db_reserv.hora) + timedelta(hours=db_reserv.duracion)).time()
            
                if not (reserva_nueva_fin <= db_reserva_inicio or reserva.hora >= db_reserva_fin): 
                    conflicto = 2 
                    break
            
        
        if conflicto==2:
            raise HTTPException(status_code=400, detail="Ya existe una reserva en esa cancha y horario")
        elif conflicto==1:
            raise HTTPException(status_code=400, detail="La duración de la reserva debe ser mayor a 0")


        for key, value in db_reserva.model_dump().items():
            if value is not None:
                setattr(reserva, key, value)
        session.commit()

        session.refresh(reserva)
        response = {
            "status": 200,
            "message": "Reserva actualizada correctamente",
            "data": reserva
        }
        return response
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()
