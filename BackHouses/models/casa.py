from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Numeric 
from dataclasses import dataclass

from db import db

@dataclass
class Casa(db.Model):
    __tablename__ = "casa"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nombre: Mapped[str] = mapped_column(String(255))  
    area: Mapped[float] = mapped_column(Numeric(10,2))
    garaje: Mapped[float] = mapped_column(Numeric(10,2))
    chimenea: Mapped[float] = mapped_column(Numeric(10,2))
    aseos: Mapped[float] = mapped_column(Numeric(10,2))
    marmol_blanco: Mapped[float] = mapped_column(Numeric(10,2))
    marmol_negro: Mapped[float] = mapped_column(Numeric(10,2))
    marmol_indio: Mapped[float] = mapped_column(Numeric(10,2))
    pisos: Mapped[float] = mapped_column(Numeric(10,2))
    ciudad: Mapped[float] = mapped_column(Numeric(10,2))
    solar: Mapped[float] = mapped_column(Numeric(10,2))
    electricidad: Mapped[float] = mapped_column(Numeric(10,2))
    fibra: Mapped[float] = mapped_column(Numeric(10,2))
    puertas_cristal: Mapped[float] = mapped_column(Numeric(10,2))
    piscina: Mapped[float] = mapped_column(Numeric(10,2))
    jardin: Mapped[float] = mapped_column(Numeric(10,2))
    precio_estimado: Mapped[float] = mapped_column(Numeric(10,2))
    precio_venta: Mapped[float] = mapped_column(Numeric(10,2))
