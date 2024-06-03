export interface Country {
  code: string;
  name: string;
}

export interface AddressFormData {
  nombreVia: string;
  numero: string;
  codigoPostal: string;
  localidad: string;
  municipio: string;
  provincia: string;
  pais: Country;
  bloque?: string;
  portal?: string;
  escalera?: string;
  piso?: string;
  puerta?: string;
}
