import xml.etree.ElementTree as ET

def decorateSVG(ruta):
    result = '''
    <polyline points=
    "0,300
    '''
    pos = 100
    nombre_ruta = ruta.get("nombre")

    coordenada_ruta = ruta.find(".//{http://www.uniovi.es}coordenada")
    altura_ruta = 300 - (float(coordenada_ruta.get("altura"))/100)

    result +='''{},{}
    '''.format(pos,altura_ruta)

    hitos = ruta.findall(".//{http://www.uniovi.es}hito")


    for hito in hitos:
        pos+=100
        nombre_hito = hito.get("nombre")
        coordenada_hito = hito.find(".//{http://www.uniovi.es}coordenada")
        altura_hito = float(coordenada_hito.get("altura"))/100
        print(altura_hito)
        result +='''{},{}
    '''.format(pos,altura_hito)


    result+=   ''' 500,300
    0,300"
    style="fill:white;stroke:red;stroke-width:4" />'''
    return result

def xmlToSVG(miArchivoXML, miArchivoSVG, nRuta):
    svgToCreate = '''<svg xmlns="http://www.w3.org/2000/svg">'''

    try:
        rutas = ET.parse(miArchivoXML)
    except IOError:
        print('No se encuentra el archivo ', miArchivoXML)
        exit()
    except ET.ParseError:
        print("Error procesando en el archivo XML =", miArchivoXML)
        exit()

    root = rutas.getroot()

    rutas = root.findall(".//{http://www.uniovi.es}ruta")
    ruta = rutas[int(nRuta) - 1]
    svgToCreate = svgToCreate + decorateSVG(ruta)
    svgToCreate += '''
    <text x="100" y="320" style="writing-mode: tb; glyph-orientation-vertical: 0;">
    Salida de la ruta
    </text>
    <text x="200" y="320" style="writing-mode: tb; glyph-orientation-vertical: 0;">
    Primer Hito
    </text>
    <text x="300" y="320" style="writing-mode: tb; glyph-orientation-vertical: 0;">
    Segundo Hito
    </text>
    <text x="400" y="320" style="writing-mode: tb; glyph-orientation-vertical: 0;">
    Tercer Hito
    </text>
    '''
    svgToCreate += '</svg>'
    open(miArchivoSVG, 'w', encoding='utf-8').write(svgToCreate)

def main():
    miArchivoXML = input('Introduzca un archivo XML = ')
    miArchivoSVG = input('Introduzca el nombre del nuevo archivo SVG = ')
    nRuta = input('Selecciona qué ruta quieres visualizar (1, 2, 3)')
    xmlToSVG(miArchivoXML, miArchivoSVG, nRuta)

if __name__ == "__main__":
    main()