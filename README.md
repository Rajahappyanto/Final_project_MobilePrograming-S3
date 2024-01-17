# Final_project_MobilePrograming-S3

![Screenshot 2024-01-17 210536](https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/15c119a6-f64f-4da2-8c48-b5e4ec3020b7)

## Project UAS
```
Nama            : Raja Happyanto
Kelas           : TI.22.A2
NIM             : 312210235
Dosen Pengampu  : Donny Maulana, S.Kom., M.M.S.I
Mata Kuliah     : Pemrograman Mobile (UAS)
```

## Isi Program 
- Fibonacci
- Scroll Sianida
- Alarm
- Chat
- Maps
- Fragment
- Launcer spash
## Demo Video Aplikasi, di jalankan pada Perangkat Xiaomi

https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/67a08865-1097-459b-92c2-c95766b7f57d

## Laporan Project (PDF)

https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/blob/main/laporan%20mobile.pdf

## Tampilan Aplikasi Dahbord
<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/90754789-6b35-4679-aee0-4de90740e6db" width="300" height="650" alt="dasbord">

![Screenshot (130)](https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/218a4b91-c809-40d3-a4c4-e052773ae6be)

## 1. Splash
```
code and design
```
![img](https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/83eddca3-bbe3-4c1b-8163-7e815c8eefa5)

### Output
<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/8cdce420-2ee7-4938-94a9-a3c105ee34fc" width="300" height="650" alt="Splah">

## 2. Fibonacci
```
code and design
```
![Screenshot (136)](https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/440fb2d6-8329-4f90-92ad-45d0691fcd61)

### Output
<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/0361ed09-3dd8-4cae-9f1f-c3f9e1d3e786" width="300" height="650" alt="Fibo">

## 3. Scroll Sianida
```
code and design
```
![Screenshot (134)](https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/62773a1b-13c5-44ee-bbaa-615edf6cf0c0)

### Output
<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/a93b5311-eaf3-46f7-bddd-66180af51240" width="300" height="650" alt="sianida">

## 4. Alarm
```
code 
```
```
        buttonAlarm.setOnClickListener(v -> {
            Intent intent = new Intent(AlarmClock.ACTION_SHOW_ALARMS);
            startActivity(intent);
        });
```
### Output
<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/4ffd6fc9-f9bd-48d8-81f8-8dbd9667c54b" width="300" height="650" alt="alrm">

## 5. Chat
```
code and design
```
![Screenshot (135)](https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/787e74e4-a6b6-4704-b680-2329349bcd0b)

### Output
<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/c0bb1ec4-3f96-4243-836f-a8ee8ac67ce4" width="300" height="650" alt="chat">

## 6. Maps
```
code 
```
```
        buttonMaps.setOnClickListener(v -> {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.google.com/maps/place/UNIVERSITAS+PELITA+BANGSA/@-6.3246424,107.1690454,14z/am=t/data=!4m20!1m13!4m12!1m3!2m2!1d107.1686063!2d-6.3232206!1m6!1m2!1s0x2e699b0c08ad8d01:0x2b18001d1b1371f9!2sUNIVERSITAS+PELITA+BANGSA,+Jl.+Inspeksi+Kalimalang+No.9,+Cibatu,+Cikarang+Sel.,+Kabupaten+Bekasi,+Jawa+Barat+17530!2m2!1d107.1692944!2d-6.3242459!3e9!3m5!1s0x2e699b0c08ad8d01:0x2b18001d1b1371f9!8m2!3d-6.3242459!4d107.1692944!16s%2Fg%2F1hm2jxhj1?entry=ttu"));
            startActivity(intent);
        });
```
### Output
<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/b19e97ac-e3b8-44f3-a4d5-9b28019857db" width="300" height="650" alt="Maps">


## 7. Telephon and kalender
```
code
```
```
buttonCalender.setOnClickListener(v -> {
            Intent intent = new Intent(Intent.ACTION_MAIN);
            intent.addCategory(Intent.CATEGORY_APP_CALENDAR);
            startActivity(intent);
        });
```
```
buttonTelpon.setOnClickListener(view -> {
            String numberDeveloper = "08+++++++";
            Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + numberDeveloper));
            startActivity(intent);
        });
```
### Output
<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/81af72c7-429d-4890-9471-6e24253994f4" width="300" height="650" alt="klen">

<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/ba51efca-c73a-421b-ba9f-ce75bde37e60" width="300" height="650" alt="tlp">


## 8. Fragment
```
code and design
```

![Screenshot (132)](https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/610c4897-b195-4eb0-b7e3-053fe6912440)

### Output

<img src="https://github.com/Rajahappyanto/Final_project_MobilePrograming-S3/assets/115520477/bfaf335b-d115-45e5-8b39-c4a391aff5c4" width="300" height="650" alt="Film">

