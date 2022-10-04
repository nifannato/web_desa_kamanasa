<?php

/*
 *
 * File ini bagian dari:
 *
 * OpenSID
 *
 * Sistem informasi desa sumber terbuka untuk memajukan desa
 *
 * Aplikasi dan source code ini dirilis berdasarkan lisensi GPL V3
 *
 * Hak Cipta 2009 - 2015 Combine Resource Institution (http://lumbungkomunitas.net/)
 * Hak Cipta 2016 - 2022 Perkumpulan Desa Digital Terbuka (https://opendesa.id)
 *
 * Dengan ini diberikan izin, secara gratis, kepada siapa pun yang mendapatkan salinan
 * dari perangkat lunak ini dan file dokumentasi terkait ("Aplikasi Ini"), untuk diperlakukan
 * tanpa batasan, termasuk hak untuk menggunakan, menyalin, mengubah dan/atau mendistribusikan,
 * asal tunduk pada syarat berikut:
 *
 * Pemberitahuan hak cipta di atas dan pemberitahuan izin ini harus disertakan dalam
 * setiap salinan atau bagian penting Aplikasi Ini. Barang siapa yang menghapus atau menghilangkan
 * pemberitahuan ini melanggar ketentuan lisensi Aplikasi Ini.
 *
 * PERANGKAT LUNAK INI DISEDIAKAN "SEBAGAIMANA ADANYA", TANPA JAMINAN APA PUN, BAIK TERSURAT MAUPUN
 * TERSIRAT. PENULIS ATAU PEMEGANG HAK CIPTA SAMA SEKALI TIDAK BERTANGGUNG JAWAB ATAS KLAIM, KERUSAKAN ATAU
 * KEWAJIBAN APAPUN ATAS PENGGUNAAN ATAU LAINNYA TERKAIT APLIKASI INI.
 *
 * @package   OpenSID
 * @author    Tim Pengembang OpenDesa
 * @copyright Hak Cipta 2009 - 2015 Combine Resource Institution (http://lumbungkomunitas.net/)
 * @copyright Hak Cipta 2016 - 2022 Perkumpulan Desa Digital Terbuka (https://opendesa.id)
 * @license   http://www.gnu.org/licenses/gpl.html GPL V3
 * @link      https://github.com/OpenSID/OpenSID
 *
 */

interface OTP_interface
{
    /**
     * Kirim otp ke user.
     *
     * @param mixed $user
     * @param mixed $otp
     *
     * @throws \Exception
     *
     * @return void
     */
    public function kirim_otp($user, $otp);

    /**
     * Verifikasi otp user.
     *
     * @param mixed $otp
     * @param mixed $user
     *
     * @return bool
     */
    public function verifikasi_otp($otp, $user = null);

    /**
     * Kirim pesan ke user telegram.
     *
     * @param mixed $user
     *
     * @throws \Exception
     *
     * @return void
     */
    public function verifikasi_berhasil($user);

    /**
     * Cek verifikasi otp user.
     *
     * @param mixed $user
     *
     * @return bool
     */
    public function cek_verifikasi_otp($user);

    /**
     * Kirim pesan permintaan pin baru ke user telegram.
     *
     * @param mixed $user = chatID
     * @param mixed $pin
     *
     * @throws \Exception
     *
     * @return void
     */
    public function kirim_pin_baru($user, $pin);

    /**
     * Cek akun sudah terdaftar.
     *
     * @param mixed $user
     * @param mixed $chat_id
     *
     * @return bool
     */
    public function cek_akun_terdaftar($chat_id);
}
