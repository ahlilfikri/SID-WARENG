const puppeteer = require('puppeteer');
const encrypt = require('../../../utils/encryptDecrypt');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const getBase64Image = (filePath) => {
    const imageBuffer = fs.readFileSync(filePath);
    const base64 = imageBuffer.toString('base64');
    const mimeType = path.extname(filePath) === '.png' ? 'image/png' : 'image/jpeg';
    return `data:${mimeType};base64,${base64}`;
};

const aksara_jawa = getBase64Image(path.resolve(__dirname, '../../../assets/surat_utils/aksara_jawa.png'));
const logo = getBase64Image(path.resolve(__dirname, '../../../assets/surat_utils/logo_wareng.png'));

const generateHTML = ({nomoSurat, nameAcara, jenisSurat, isiAcara, tanggalMulai, tanggalSelesai, tempatAcara, RtName, RwName, user}) => {
    const aesKey = crypto.scryptSync(
        process.env.encrypt_key_one, 
        process.env.encrypt_key_two,
        32
    ); 
    const formattedDate = formatTime(new Date()).slice(0, -5);

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <!-- nanti make internal css -->
        <style>
            body{
                font-family: 'Times New Roman', Times, serif;
                color: black;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                line-height: 1.5;
            }

            .surat{
                width: 210mm;    
                height: 297mm;    
                background-color: white;    
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);     
                box-sizing: border-box;
                padding-top: 20px;
                padding-left: 40px;
                padding-right: 40px;
            }

            .cop-header{
                display: flex;
                border-bottom: 4px ridge black;
                align-items: center;
                text-align: center;
                line-height: 1;
                padding-bottom: 20px;
            }
            .garis-header{
                margin-top: 2px;
                border-top: 1px solid black;
            }

            .cop-header p{
                margin: 0;
                padding: 0;
            }
            .cop-header p:first-child{
                font-size: 18px;
                font-weight: bold;
            }
            .cop-header p:nth-child(2){
                font-size: 18px;
                font-weight: bold;
            }
            .cop-header p:nth-child(3){
                font-size: 20px;
                font-weight: bold;
            }

            .cop-header p:nth-child(4){
                font-size: 14px;
                font-weight: bold;
            }


            .text-header{
                display: block;
                text-align: center;
                margin-top: 20px;
                margin-left: 100px;
            }

            .text-header img{
                width: 300px;
                height: 50px;
                float: left;
                margin-left: 30px;
            }

            .surat-title{
                text-align: center;
                margin-top: 20px;
                margin-bottom: 20px;
                line-height: 1;
            }
            .surat-title h1{
                font-size: 24px;
                font-weight: bold;
            }

            .surat-tandatangan{
                display: flex;
                justify-content: end;
                margin-top: 20px;
                margin-bottom: 20px;
                text-align: center;
            }

        </style>
    </head>
    <body>
        <div class="surat">
            <div class="cop-header">
                <img src="${logo}" alt="">
                <div class="text-header">
                    <p>KABUPATEN GUNUNGKIDUL</p>
                    <p>KAPANEWON WONOSARI</p>
                    <p>PEMERINTAH KALURAHAN WARENG</p>
                    <img src="${aksara_jawa}" alt="">
                    <br>
                    <br>
                    <br>
                    <br>
                    <p>Jalan . Wonosari Paliyan KM. 04 Kode Pos 55851</p>
                    <p>Website: www.wareng-wonosari.desa.id</p>
                </div>
            </div>
            <div class="garis-header"></div>
            
            <div class="surat-title">
                <strong>
                    
                    <u>
                        <p>
                            ${jenisSurat}
                        </p>
                    </u>
                </strong>
                <p>Nomor : ${nomoSurat}</p>
            </div>

            <div class="isi-surat">
                <p>
                    <!-- tab di html -->
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Yang bertanda tangan di bawah ini Lurah Wareng Kapanewon Wonosari Kabupaten Gunungkidul menerangkan bahwa :
                </p>

                <table>
                    <tr>
                        <td>Nama</td>
                        <td>:</td>
                        <td>${user.name}</td>
                    </tr>
                    <tr>
                        <td>Tempat, Tanggal Lahir</td>
                        <td>:</td>
                        <td>${user.tempatlahir}, ${formatTime(user.tanggallahir)}</td>
                    </tr>
                    <tr>
                        <td>NIK</td>
                        <td>:</td>
                        <td>${encrypt.dekripsi(user.nik, aesKey, user.iv)}</td>
                    </tr>
                    <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>${user.jenisKelamin}</td>
                    </tr>
                    <tr>
                        <td>Agama</td>
                        <td>:</td>
                        <td>${user.agama}</td>
                    </tr>
                    <tr>
                        <td>Pekerjaan</td>
                        <td>:</td>
                        <td>${user.pekerjaan}</td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <td>${encrypt.dekripsi(user.alamat, aesKey, user.iv)}</td>
                    </tr>
                    <tr>
                        <td>Keperluan</td>
                        <td>:</td>
                        <td>
                            ${nameAcara} yang akan dilaksanakan pada tanggal ${formatTime(tanggalMulai)} sampai dengan ${formatTime(tanggalSelesai)} di ${tempatAcara}
                        </td>
                    </tr>
                    <tr>
                        <td>keterangan lain lain</td>
                        <td>:</td>
                        <!-- list filed isiAcara -->
                        <td>
                            <ul>
                                ${isiAcara.map((isi, index) => `<li>${index + 1}. ${isi}</li>`).join('')}
                            </ul>
                        </td>
                    </tr>

                    
                </table>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Demikian surat keterangan ini dibuat dengan sesungguhnya, agar yang berkepentingan maklum dan dapat dipergunakan sebagaimana mestinya.
                </p>
            </div>

            <div class="surat-tandatangan">
                <div class="ttd">
                    <!-- tanda tangan persetujuan surat oleh kades -->
                    <p>Wareng, ${formattedDate}</p>
                    <p>Lurah Wareng</p>
                    <br>
                    <br>
                    <br>
                    <p>(............................................)</p>
                </div>
            </div>
        
        </div>
    </body>
    </html>
    `;
};

const formatTime = (timeString) => {
    const date = new Date(timeString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${dateNum} ${month} ${year} ${hours}:${minutes}`;
};

const generateSuratPDF = async (data) => {
    const html = generateHTML(data);
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage(); 

    await page.setContent(html);
    await page.emulateMediaType('screen');
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();
    return pdfBuffer;
};

module.exports = { generateSuratPDF };




















// bantuan sosial

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//     <!-- nanti make internal css -->
//     <style>
//          body{
//             font-family: 'Times New Roman', Times, serif;
//             color: black;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//             line-height: 1.5;
//         }

//         .surat{
//             width: 210mm;    
//             height: 297mm;    
//             background-color: white;    
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);     
//             box-sizing: border-box;
//             padding-top: 20px;
//             padding-left: 40px;
//             padding-right: 40px;
//         }

//         .cop-header{
//             display: flex;
//             border-bottom: 4px ridge black;
//             align-items: center;
//             text-align: center;
//             line-height: 1;
//             padding-bottom: 20px;
//         }
//         .garis-header{
//             margin-top: 2px;
//             border-top: 1px solid black;
//         }

//         .cop-header p{
//             margin: 0;
//             padding: 0;
//         }
//         .cop-header p:first-child{
//             font-size: 18px;
//             font-weight: bold;
//         }
//         .cop-header p:nth-child(2){
//             font-size: 18px;
//             font-weight: bold;
//         }
//         .cop-header p:nth-child(3){
//             font-size: 20px;
//             font-weight: bold;
//         }

//         .cop-header p:nth-child(4){
//             font-size: 14px;
//             font-weight: bold;
//         }


//         .text-header{
//             display: block;
//             text-align: center;
//             margin-top: 20px;
//             margin-left: 100px;
//         }

//         .text-header img{
//             width: 300px;
//             height: 50px;
//             float: left;
//             margin-left: 30px;
//         }

//         .surat-title{
//             text-align: center;
//             margin-top: 20px;
//             margin-bottom: 20px;
//             line-height: 1;
//         }
//         .surat-title h1{
//             font-size: 24px;
//             font-weight: bold;
//         }

//         .surat-tandatangan{
//             display: flex;
//             justify-content: end;
//             margin-top: 20px;
//             margin-bottom: 20px;
//             text-align: center;
//         }

//     </style>
// </head>
// <body>
//     <div class="surat">
//         <div class="cop-header">
//             <img src="./logo_wareng.jpg" alt="">
//             <div class="text-header">
//                 <p>KABUPATEN GUNUNGKIDUL</p>
//                 <p>KAPANEWON WONOSARI</p>
//                 <p>PEMERINTAH KALURAHAN WARENG</p>
//                 <img src="./aksara_jawa.jpg" alt="">
//                 <br>
//                 <br>
//                 <br>
//                 <br>
//                 <p>Jalan . Wonosari Paliyan KM. 04 Kode Pos 55851</p>
//                 <p>Website: www.wareng-wonosari.desa.id</p>
//             </div>
//         </div>
//         <div class="garis-header"></div>
        

//         <div class="surat-title">
//             <strong>
                
//                 <u>
//                     <p>Surat Keterangan Usaha</p>
//                 </u>
//             </strong>
//             <p>Nomor : 518/48/VI /2024</p>
//         </div>

//         <div class="isi-surat">
//             <p>
//                 <!-- tab di html -->
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 Yang bertanda tangan di bawah ini Lurah Wareng Kapanewon Wonosari Kabupaten Gunungkidul menerangkan bahwa :
//             </p>

//             <table>
//                 <tr>
//                     <td>Nama</td>
//                     <td>:</td>
//                     <td>Wahyu</td>
//                 </tr>
//                 <tr>
//                     <td>Tempat, Tanggal Lahir</td>
//                     <td>:</td>
//                     <td>Wonosari, 12 Januari 1999</td>
//                 </tr>
//                 <tr>
//                     <td>NIK</td>
//                     <td>:</td>
//                     <td>12345678987654321</td>
//                 </tr>
//                 <tr>
//                     <td>Jenis Kelamin</td>
//                     <td>:</td>
//                     <td>laki laki / perempuan</td>
//                 </tr>
//                 <tr>
//                     <td>Agama</td>
//                     <td>:</td>
//                     <td>Islam</td>
//                 </tr>
//                 <tr>
//                     <td>Pekerjaan</td>
//                     <td>:</td>
//                     <td>Wiraswasta</td>
//                 </tr>
//                 <tr>
//                     <td>Alamat</td>
//                     <td>:</td>
//                     <td>Wonosari</td>
//                 </tr>


                
//             </table>
//             <p>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 Yang bersangkutan benar - benar penduduk Kalurahan Wareng, Kapanewon Wonosar Kabupaten Gunungkidul dan memiliki usaha :
//             </p>

            
//             <table>
//                 <tr>
//                     <td>1. Usaha pokok</td>
//                     <td>:</td>
//                     <td>Ternak Kambing</td>
//                 </tr>
//                 <tr>
//                     <td>2. Usaha sampingan</td>
//                     <td>:</td>
//                     <td>Jualan Somay</td>
//                 </tr>
//                 <tr>
//                     <td>3. Lokasi usaha</td>
//                     <td>:</td>
//                     <td>Wareng III Rt 03/03 Wareng Wonosari.</td>
//                 </tr>


                
//             </table>

//             <p>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                 Demikian surat keterangan ini dibuat dengan sesungguhnya, agar yang berkepentingan maklum dan dapat dipergunakan sebagaimana mestinya.
//             </p>
//         </div>

//         <div class="surat-tandatangan">
//             <div class="ttd">
//                 <!-- tanda tangan persetujuan surat oleh kades -->
//                 <p>Wonosari, 12 Januari 2021</p>
//                 <p>Lurah Wareng</p>
//                 <br>
//                 <br>
//                 <br>
//                 <p>(............................................)</p>
//             </div>
//         </div>




        
//     </div>
// </body>
// </html>
