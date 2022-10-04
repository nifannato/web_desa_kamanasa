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

defined('BASEPATH') || exit('No direct script access allowed');

class Siteman extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        siteman_timeout();
        $this->load->model('user_model');
        $this->load->model('theme_model');
    }

    public function index()
    {
        if (isset($_SESSION['siteman']) && $_SESSION['siteman'] == 1) {
            redirect('main');
        }
        unset($_SESSION['balik_ke']);
        $data['header']      = $this->config_model->get_data();
        $data['latar_login'] = $this->theme_model->latar_login();
        //Initialize Session ------------
        if (! isset($_SESSION['siteman'])) {
            // Belum ada session variable
            $this->session->set_userdata('siteman', 0);
            $this->session->set_userdata('siteman_try', 4);
            $this->session->set_userdata('siteman_wait', 0);
        }
        $_SESSION['success']    = 0;
        $_SESSION['per_page']   = 10;
        $_SESSION['cari']       = '';
        $_SESSION['pengumuman'] = 0;
        $_SESSION['sesi']       = 'kosong';
        //-------------------------------

        $this->load->view('siteman', $data);
    }

    public function auth()
    {
        $method       = $this->input->method(true);
        $allow_method = ['POST'];
        if (! in_array($method, $allow_method)) {
            redirect('siteman/login');
        }
        $this->user_model->siteman();

        if ($_SESSION['siteman'] != 1) {
            // Gagal otentifikasi
            redirect('siteman');
        }

        if (! $this->user_model->syarat_sandi() && ! ($this->session->user == 1 && config_item('demo_mode'))) {
            // Password tidak memenuhi syarat kecuali di website demo
            redirect('user_setting/change_pwd');
        }

        $_SESSION['dari_login'] = '1';
        // Notif bisa dipanggil sewaktu-waktu dan tidak digunakan untuk redirect
        if (isset($_SESSION['request_uri']) && strpos($_SESSION['request_uri'], 'notif/') === false) {
            // Lengkapi url supaya tidak diubah oleh redirect
            $request_awal = $_SERVER['HTTP_ORIGIN'] . $_SESSION['request_uri'];
            unset($_SESSION['request_uri']);
            redirect($request_awal);
        } else {
            unset($_SESSION['request_uri']);
            redirect('main');
        }
    }

    public function login()
    {
        $this->user_model->login();
        $data['header'] = $this->config_model->get_data();
        $this->load->view('siteman', $data);
    }

    public function logout()
    {
        $this->user_model->logout();
        $this->index();
    }
}
