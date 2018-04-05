var enPrueba = true;
var pages =JSON.parse('{"pages" : ['+
                '{"id": "01","url": "index.html", "title": "Subitus" },'+
                '{"id": "02","url": "02.html","title": "Moodle"},'+
                '{"id": "03","url": "03.html","title": "App Tincan"},'+
                '{"id": "04","url": "04.html","title": "Aviso de privacidad"},'+
                '{"id": "05","url": "05.html","title": "Blog"},'+
                '{"id": "06","url": "06.html","title": "Chamillo"},'+
                '{"id": "07","url": "07.html","title": "Contacto"},'+
                '{"id": "08","url": "08.html","title": "Detalle de post"},'+
                '{"id": "09","url": "09.html","title": "E-learning"},'+
                '{"id": "10","url": "examen.html","title": "Prueba del curso"}'+
                ']}');

pages = pages.pages;

var lessons ={
    lecciones : [
    ["01", "02", "03"],
    ["04", "05", "06"],
    ["07", "08", "09"]
    ]
};
lessons = lessons.lecciones;

var resoluciones = {
	"resoluciones": [
		{"id": "01", "resolucion": "320x200"},
		{"id": "02", "resolucion": "320x240"},
		{"id": "03", "resolucion": "480x320"},
		{"id": "04", "resolucion": "512x384"},
		{"id": "05", "resolucion": "640x350"},
		{"id": "06", "resolucion": "640x480"},
		{"id": "07", "resolucion": "720x348"},
		{"id": "08", "resolucion": "720x350"},
		{"id": "09", "resolucion": "720x360"},
		{"id": "10", "resolucion": "360x640"},
		{"id": "11", "resolucion": "800x600"},
		{"id": "12", "resolucion": "850x480"},
		{"id": "13", "resolucion": "1024x768"},
		{"id": "14", "resolucion": "1152x640"},
		{"id": "15", "resolucion": "1280x768"},
		{"id": "16", "resolucion": "1360x768"},
		{"id": "17", "resolucion": "1366x768"},
		{"id": "18", "resolucion": "1280x800"},
		{"id": "19", "resolucion": "1280x1024"},
		{"id": "20", "resolucion": "1440x900"},
		{"id": "21", "resolucion": "1400x1050"},
		{"id": "22", "resolucion": "1600x900"},
		{"id": "23", "resolucion": "1680x1050"},
		{"id": "24", "resolucion": "1600x1200"},
		{"id": "25", "resolucion": "1920x1080"},
		{"id": "26", "resolucion": "1920x1200"},
		{"id": "27", "resolucion": "1920x1440"},
		{"id": "28", "resolucion": "2048x1152"},
		{"id": "29", "resolucion": "2048x1536"},
		{"id": "30", "resolucion": "2560x1440"},
		{"id": "31", "resolucion": "2560x1600"},
		{"id": "32", "resolucion": "2560x2048"},
		{"id": "33", "resolucion": "2880x1800"},
		{"id": "34", "resolucion": "2880x1440"},
		{"id": "35", "resolucion": "3200x2048"},
		{"id": "36", "resolucion": "3200x2400"},
		{"id": "37", "resolucion": "3840x2160"},
		{"id": "38", "resolucion": "4096x2160"},
		{"id": "39", "resolucion": "3840x2400"},
		{"id": "40", "resolucion": "5120x4096"},
		{"id": "41", "resolucion": "6400x4096"},
		{"id": "42", "resolucion": "6400x4800"},
		{"id": "43", "resolucion": "7680x4800"},
		{"id": "44", "resolucion": "2160x1080"},
		{"id": "45", "resolucion": "1440x720"},
		{"id": "46", "resolucion": "2220x1080"},
		{"id": "47", "resolucion": "2960x1440"},
		{"id": "48", "resolucion": "2436x1125"},
		{"id": "49", "resolucion": "1334x750"},
		{"id": "50", "resolucion": "320x480"},
		{"id": "51", "resolucion": "640x1136"},
		{"id": "52", "resolucion": "750x1334"},
		{"id": "53", "resolucion": "768x1024"},
		{"id": "54", "resolucion": "640x960"},
		{"id": "55", "resolucion": "720x1280"},
		{"id": "56", "resolucion": "600x1024"},
		{"id": "57", "resolucion": "1380x768"}
	]
};

resoluciones = resoluciones.resoluciones;

var clientStrings = [
    {
        //s: 'Windows 10',
        s: '00',
        r: /(Windows 10.0|Windows NT 10.0)/
    },
    {
        //s: 'Windows 8.1',
        s: '01',
        r: /(Windows 8.1|Windows NT 6.3)/
    },
    {

        //s: 'Windows 8',
        s: '02',
        r: /(Windows 8|Windows NT 6.2)/
    },
    {
        //s: 'Windows 7',
        s: '03',
        r: /(Windows 7|Windows NT 6.1)/
    },
    {
        s: '04',
        //s: 'Windows Vista',
        r: /Windows NT 6.0/
    },
    {
        s: '05',
        //s: 'Windows Server 2003',
        r: /Windows NT 5.2/
    },
    {
        s: '06',
        //s: 'Windows XP',
        r: /(Windows NT 5.1|Windows XP)/
    },
    {
        s: '07',
        //s: 'Windows 2000',
        r: /(Windows NT 5.0|Windows 2000)/
    },
    {
        s: '08',
        //s: 'Windows ME',
        r: /(Win 9x 4.90|Windows ME)/
    },
    {
        s: '09',
        //s: 'Windows 98',
        r: /(Windows 98|Win98)/
    },
    {
        s: '10',
        //s: 'Windows 95',
        r: /(Windows 95|Win95|Windows_95)/
    },
    {
        s: '11',
        //s: 'Windows NT 4.0',
        r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
    },
    {
        s: '12',
        //s: 'Windows CE',
        r: /Windows CE/
    },
    {
        s: '13',
        //s: 'Windows 3.11',
        r: /Win16/
    },
    {
        s: '14',
        //s: 'Android',
        r: /Android/
    },
    {
        s: '15',
        //s: 'Open BSD',
        r: /OpenBSD/
    },
    {
        s: '16',
        //s: 'Sun OS',
        r: /SunOS/
    },
    {
        s: '17',
        //s: 'Linux',
        r: /(Linux|X11)/
    },
    {
        s: '18',
        //s: 'iOS',
        r: /(iPhone|iPad|iPod)/
    },
    {
        s: '19',
        //s: 'Mac OS X',
        r: /Mac OS X/
    },
    {
        s: '20',
        //s: 'Mac OS',
        r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
    },
    {
        s: '21',
        //s: 'QNX',
        r: /QNX/
    },
    {
        s: '22',
        //s: 'UNIX',
        r: /UNIX/
    },
    {
        s: '23',
        //s: 'BeOS',
        r: /BeOS/
    },
    {
        s: '24',
        //s: 'OS/2',
        r: /OS\/2/
    },
    {
        s: '25',
        //s: 'Search Bot',
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
    }
];