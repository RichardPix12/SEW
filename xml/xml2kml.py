""""
Transformador de XML a KML

@version 1.1 04/11/2022
@author: Ricardo Marqués Garay Estudiante Universidad de Oviedo
"""
import xml.etree.ElementTree as ET



def decorateKML(ruta):
    nombre_ruta = ruta.get("nombre")
    nombre_inicio = ruta.get("lugarInicio")
    print(nombre_ruta)


    result = f'''
    <name>{nombre_ruta}</name>
    '''

    coordenada_ruta = ruta.find(".//{http://www.uniovi.es}coordenada")
    longitud = coordenada_ruta.get("longitud")
    latitud = coordenada_ruta.get("latitud")
    altura = coordenada_ruta.get("altura")
    result += '''
    <Placemark>
        <name>{}</name>
        <Point>
            <coordinates>{},{},{}</coordinates>
        </Point>
    </Placemark>
'''.format(nombre_inicio,longitud, latitud, altura)
    coordinates = []
    coordinates.append((longitud, latitud, altura))
    hitos = ruta.findall(".//{http://www.uniovi.es}hito")
    for hito in hitos:
        nombre_hito = hito.get("nombre")

        coordenada_hito = hito.find(".//{http://www.uniovi.es}coordenada")
        longitud_hito = coordenada_hito.get("longitud")
        latitud_hito = coordenada_hito.get("latitud")
        altura_hito = coordenada_hito.get("altura")

        result += f'''
    <Placemark>
        <name>{nombre_hito}</name>
        <Point>
            <coordinates>{longitud_hito},{latitud_hito},{altura_hito}</coordinates>
        </Point>
    </Placemark>
        '''

        coordinates.append((longitud_hito, latitud_hito, altura_hito))

    # Añadir la línea conectando los hitos
    if len(coordinates) > 1:
        line_coordinates = ' '.join(f"{lon},{lat},{alt}" for lon, lat, alt in coordinates)
        result += f'''
    <Placemark>
        <LineString>
            <coordinates>{line_coordinates}</coordinates>
        </LineString>
    </Placemark>
        '''
    return result


'''
<Placemark>
<name> </name>
<Point>
<coordinates></coordinates>
</Point>
</Placemark>
'''
def xmlToKml(miArchivoXML,miArchivoKML,nRuta):

    kmlToCreate='''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns=\"http://www.opengis.net/kml/2.2">
<Document>
   '''

    try:
        rutas = ET.parse(miArchivoXML)

    except IOError:
        print ('No se encuentra el archivo ', miArchivoXML)
        exit()

    except ET.ParseError:
        print("Error procesando en el archivo XML = ", miArchivoXML)
        exit()

    root = rutas.getroot()

    rutas = root.findall(".//{http://www.uniovi.es}ruta")
    ruta = rutas[int(nRuta)-1]
    kmlToCreate = kmlToCreate + decorateKML(ruta)
    kmlToCreate = kmlToCreate +'\n</Document>\n</kml>'
    open(miArchivoKML,'w', encoding='utf-8').write(kmlToCreate)

def main():

    miArchivoXML = input('Introduzca un archivo XML = ')
    miArchivoKML = input('Introduzca el nombre del nuevo archivo KML = ')
    nRuta = input('Selecciona que ruta quieres visualizar (1,2,3)')
    xmlToKml(miArchivoXML,miArchivoKML,nRuta)
if __name__ == "__main__":
    main()