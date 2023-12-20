<?php

class Record {


    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2023";
        $this->pass = "DBPSWD2023";
        $this->dbname = "records";
    }


    public function insertarRegistro(){
        $nombre = $_POST['nombre'];
        $apellidos = $_POST['apellidos'];
        $nivel = $_POST['nivel'];
        $tiempo = $_POST['tiempo'];
        $tiempoSegundos = $this->convertirStringASegundos($tiempo);

        $db=new mysqli($this->server,
                         $this->user,
                         $this->pass,
                         $this->dbname);

        if($db->connect_error) {
            exit ("<h2>ERROR".$db->connect_error."</h2>");  
        }

        $stmt = $db->prepare("INSERT INTO registro VALUES (?, ?, ?, ?)");
        $stmt->bind_param('sssi', $nombre, $apellidos, $nivel, $tiempoSegundos);
        $stmt->execute();
        $stmt->close();
        
    }

    public function mostrarRegistro(){
        $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($db->connect_error) {
            exit ("<h2>ERROR".$db->connect_error."</h2>");
        }

        $query = "SELECT * FROM registro ORDER BY `TIEMPO` LIMIT 10"; // Corregir la ordenación
        $res = $db->query($query);

        echo "<section><h2>Lista de mejores resultados</h2><ol>";

        while ($registro = $res->fetch_assoc()) {
            $nombre = $registro['nombre'];
            $apellidos = $registro['apellidos'];
            $nivel = $registro['nivel'];
            $tiempo = $registro['tiempo'];
            $tiempoConFormato = $this->convertirSegundosAString($tiempo);
            echo "<li> Nombre:" . $nombre . ", Apellidos: " . $apellidos . ", Nivel: " . $nivel . ", Tiempo: " . $tiempoConFormato  . "</li>";
        }

        echo "</ol></section>";

        $db->close(); // Cerrar la conexión después de usarla
    }

    public function convertirStringASegundos($tiempoString) {
        $tiempoArray = explode("::", $tiempoString);

        if (count($tiempoArray) >= 3) {
            $horas = (int)$tiempoArray[0];
            $minutos = (int)$tiempoArray[1];
            $segundos = (int)$tiempoArray[2];
            $tiempoTotal = $horas * 3600 + $minutos * 60 + $segundos;

            return $tiempoTotal;
        } else {
            echo "Error: El formato del tiempo no es válido.";
        }
    }

    public function convertirSegundosAString($tiempoTotal) {
        $horas = floor($tiempoTotal / 3600);
        $minutos = floor(($tiempoTotal % 3600) / 60);
        $segundos = $tiempoTotal % 60;
        $tiempoString = sprintf("%02d::%02d::%02d", $horas, $minutos, $segundos);
    
        return $tiempoString;
    }
}




?>
<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title> Crucigrama </title>
    <meta name ="author" content ="Ricardo Marques" />
    <meta name ="description" content ="Juego matematico donde debes completar las operaciones" />
    <meta name ="keywords" content ="crucigrama, juego" />

    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/crucigrama.css" />
    <script src="js/crucigrama.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1> Escritorio virtual </h1>
    
        <nav>
            <a tabindex="1" title="Pagina principal"  accesskey="p" href="index.html"> Pagina principal</a>
            <a tabindex="2" title="Sobre mi"  accesskey="s" href="sobremi.html"> Sobre mi</a>
            <a tabindex="3" title="Agenda"  accesskey="a" href="agenda.html"> Agenda</a>
            <a tabindex="4" title="Noticias"  accesskey="n" href="noticias.html"> Noticias</a>
            <a tabindex="5" title="Meteorología"  accesskey="m" href="meteorologia.html" > Meteorología</a>
            <a tabindex="6" title="Juegos"  accesskey="j" href="juegos.html"> Juegos</a>
            <a tabindex="7" title="Viajes"  accesskey="v" href="viajes.html" > Viajes</a>
        </nav>

    </header>
   <main></main>

   <?php 
   
    $record = new Record();
    if (count($_POST) > 0) {
        $record -> insertarRegistro();
        $record -> mostrarRegistro(); 
    }
   ?>
</body>
<script>
    crucigrama.paintMathWord()
    crucigrama.addKeyDownEvent()
</script>
</html>