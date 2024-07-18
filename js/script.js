// Menambahkan event listener untuk tombol hitung
document.getElementById('calculateBtn').addEventListener('click', calculateBMI);
// Menambahkan event listener untuk tombol reset
document.getElementById('resetBtn').addEventListener('click', resetForm);
// Menambahkan event listener untuk tombol download
document.getElementById('downloadBtn').addEventListener('click', downloadResult);

/* Fungsi untuk menghitung BMI */
function calculateBMI() {
    // Mendapatkan nilai dari input berat badan dan tinggi badan
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    // Validasi input, memeriksa apakah berat dan tinggi valid
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Masukkan berat dan tinggi yang valid!');
        return;
    }

    // Menghitung BMI
    const bmi = weight / (height * height);
    let status = '';
    let advice = '';
    let diseaseInfo = '';

    // Menentukan status berdasarkan nilai BMI
    if (bmi < 18.5) {
        status = 'Kekurangan berat badan';
        advice = `Anda berada di dalam status kekurangan berat badan. Cara agar mengatasi hal tersebut adalah perbanyak makan makanan yang berprotein dan berkarbohidrat yang cukup. Kalkulator BMI menyarankan anda agar meningkatkan berat badan hingga batas normal.`;
        diseaseInfo = `
            <h3>Jenis Kekurangan Gizi:</h3>
            <ul>
                <li><strong>Wasting:</strong> Memiliki berat badan yang rendah dibandingkan tinggi badannya (tinggi tapi kurus).</li>
                <li><strong>Stunting:</strong> Ketika tinggi badan anak lebih pendek dibandingkan tinggi badan anak-anak seusianya.</li>
                <li><strong>Underweight:</strong> Anak-anak dengan berat badan yang rendah pada usia rata-ratanya.</li>
                <li><strong>Kekurangan zat gizi mikro:</strong> Kekurangan vitamin D dan kalsium bisa menyebabkan osteoporosis dan begitu pun kekurangan zat besi dapat menyebabkan anemia.</li>
            </ul>`;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = 'Normal (Ideal)';
        advice = `Selamat! Anda memiliki berat badan yang normal.`;
        diseaseInfo = `
            <h3>Manfaat Berat Badan Ideal:</h3>
            <ul>
                <li>Mengurangi risiko penyakit jantung dan stroke.</li>
                <li>Mengurangi risiko diabetes tipe 2.</li>
                <li>Meningkatkan energi dan suasana hati.</li>
                <li>Meningkatkan mobilitas dan mengurangi nyeri sendi.</li>
            </ul>`;
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = 'Kelebihan berat badan';
        advice = `Anda berada di dalam status kelebihan berat badan. Kalkulator BMI menyarankan anda agar menurunkan berat badan hingga batas normal.`;
        diseaseInfo = `
            <h3>Risiko Kelebihan Berat Badan:</h3>
            <ul>
                <li>Meningkatkan risiko penyakit jantung dan stroke.</li>
                <li>Meningkatkan risiko diabetes tipe 2.</li>
                <li>Meningkatkan risiko tekanan darah tinggi.</li>
                <li>Meningkatkan risiko gangguan pernapasan seperti sleep apnea.</li>
            </ul>`;
    } else {
        status = 'Obesitas';
        advice = `Anda berada di dalam status obesitas. Kalkulator BMI menyarankan anda agar menurunkan berat badan hingga batas normal.`;
        diseaseInfo = `
            <h3>Risiko Obesitas:</h3>
            <ul>
                <li>Meningkatkan risiko penyakit jantung dan stroke.</li>
                <li>Meningkatkan risiko diabetes tipe 2.</li>
                <li>Meningkatkan risiko tekanan darah tinggi.</li>
                <li>Meningkatkan risiko gangguan pernapasan seperti sleep apnea.</li>
                <li>Meningkatkan risiko beberapa jenis kanker.</li>
            </ul>`;
    }

    // Menampilkan hasil perhitungan BMI dan informasi terkait
    document.getElementById('result').textContent = bmi.toFixed(1);
    document.getElementById('status').textContent = status;
    document.getElementById('ageResult').textContent = age;
    document.getElementById('genderResult').textContent = gender;
    document.getElementById('advice').textContent = advice;
    document.getElementById('diseaseInfo').innerHTML = diseaseInfo;
}

/* Fungsi untuk mereset form */
function resetForm() {
    // Mengosongkan nilai input pada form
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    // Mengosongkan hasil perhitungan BMI dan informasi terkait
    document.getElementById('result').textContent = '0.0';
    document.getElementById('status').textContent = '-';
    document.getElementById('ageResult').textContent = '0';
    document.getElementById('genderResult').textContent = '-';
    document.getElementById('advice').textContent = '';
    document.getElementById('diseaseInfo').innerHTML = '';
}

/* Fungsi untuk mendownload hasil BMI */
function downloadResult() {
    // Mendapatkan hasil perhitungan dan informasi terkait
    const result = document.getElementById('result').textContent;
    const status = document.getElementById('status').textContent;
    const age = document.getElementById('ageResult').textContent;
    const gender = document.getElementById('genderResult').textContent;
    const advice = document.getElementById('advice').textContent;
    const diseaseInfo = document.getElementById('diseaseInfo').innerHTML;

    // Membuat elemen untuk download file
    const element = document.createElement('a');
    const file = new Blob([`
        Hasil BMI Anda\n
        ----------------------------\n
        Usia: ${age}\n
        Jenis Kelamin: ${gender}\n
        BMI: ${result}\n
        Kategori: ${status}\n
        Saran: ${advice}\n
        Informasi Penyakit: ${diseaseInfo.replace(/<[^>]+>/g, '')}\n
    `], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'BMI_Result.txt';

    // Menambahkan elemen ke dokumen dan memulai download
    document.body.appendChild(element);
    element.click();
    // Menghapus elemen setelah download selesai
    document.body.removeChild(element);
}
