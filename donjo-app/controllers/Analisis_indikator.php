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

class Analisis_indikator extends Admin_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model(['analisis_indikator_model', 'analisis_parameter_model', 'analisis_master_model']);
        $this->session->submenu  = 'Data Indikator';
        $this->session->asubmenu = 'analisis_indikator';
        $this->modul_ini         = 5;
        $this->sub_modul_ini     = 110;
    }

    public function clear()
    {
        $this->session->unset_userdata(['cari', 'filter', 'tipe', 'kategori']);

        redirect($this->controller);
    }

    public function index($p = 1, $o = 0)
    {
        unset($_SESSION['cari2']);
        $data['p'] = $p;
        $data['o'] = $o;

        if (isset($_SESSION['cari'])) {
            $data['cari'] = $_SESSION['cari'];
        } else {
            $data['cari'] = '';
        }
        if (isset($_SESSION['filter'])) {
            $data['filter'] = $_SESSION['filter'];
        } else {
            $data['filter'] = '';
        }
        if (isset($_SESSION['tipe'])) {
            $data['tipe'] = $_SESSION['tipe'];
        } else {
            $data['tipe'] = '';
        }
        if (isset($_SESSION['kategori'])) {
            $data['kategori'] = $_SESSION['kategori'];
        } else {
            $data['kategori'] = '';
        }
        if (isset($_POST['per_page'])) {
            $_SESSION['per_page'] = $_POST['per_page'];
        }
        $data['per_page'] = $_SESSION['per_page'];

        $data['paging']          = $this->analisis_indikator_model->paging($p, $o);
        $data['main']            = $this->analisis_indikator_model->list_data($o, $data['paging']->offset, $data['paging']->per_page);
        $data['keyword']         = $this->analisis_indikator_model->autocomplete();
        $data['analisis_master'] = $this->analisis_master_model->get_analisis_master($this->session->analisis_master);
        $data['list_tipe']       = $this->analisis_indikator_model->list_tipe();
        $data['list_kategori']   = $this->analisis_indikator_model->list_kategori();

        $this->render('analisis_indikator/table', $data);
    }

    public function form($p = 1, $o = 0, $id = 0)
    {
        $this->redirect_hak_akses('u');
        $data['p'] = $p;
        $data['o'] = $o;

        if ($id) {
            $data['analisis_indikator'] = $this->analisis_indikator_model->get_analisis_indikator($id);
            $data['form_action']        = site_url("{$this->controller}/update/{$p}/{$o}/{$id}");
        } else {
            $data['analisis_indikator'] = null;
            $data['form_action']        = site_url("{$this->controller}/insert");
        }

        $data['list_kategori']   = $this->analisis_indikator_model->list_kategori();
        $data['analisis_master'] = $this->analisis_master_model->get_analisis_master($this->session->analisis_master);
        $data['data_tabel']      = $this->analisis_indikator_model->data_tabel($this->session->subjek_tipe);

        $this->render('analisis_indikator/form', $data);
    }

    public function parameter($id = 0)
    {
        $ai = $this->analisis_indikator_model->get_analisis_indikator($id);
        if ($ai['id_tipe'] == 3 || $ai['id_tipe'] == 4) {
            redirect($this->controller);
        }

        $data['analisis_indikator'] = $this->analisis_indikator_model->get_analisis_indikator($id);
        $data['analisis_master']    = $this->analisis_master_model->get_analisis_master($this->session->analisis_master);
        $data['main']               = $this->analisis_indikator_model->list_indikator($id);

        $this->render('analisis_indikator/parameter/table', $data);
    }

    public function form_parameter($in = '', $id = 0)
    {
        $this->redirect_hak_akses('u');
        if ($id) {
            $data['analisis_parameter'] = $this->analisis_indikator_model->get_analisis_parameter($id);
            $data['form_action']        = site_url("{$this->controller}/p_update/{$in}/{$id}");
        } else {
            $data['analisis_parameter'] = null;
            $data['form_action']        = site_url("{$this->controller}/p_insert/{$in}");
        }

        $data['analisis_master']    = $this->analisis_master_model->get_analisis_master($this->session->analisis_master);
        $data['analisis_indikator'] = $this->analisis_indikator_model->get_analisis_indikator($in);

        $this->load->view('analisis_indikator/parameter/ajax_form', $data);
    }

    public function search()
    {
        $cari = $this->input->post('cari');
        if ($cari != '') {
            $_SESSION['cari'] = $cari;
        } else {
            unset($_SESSION['cari']);
        }

        redirect($this->controller);
    }

    public function filter()
    {
        $filter = $this->input->post('filter');
        if ($filter != 0) {
            $_SESSION['filter'] = $filter;
        } else {
            unset($_SESSION['filter']);
        }

        redirect($this->controller);
    }

    public function tipe()
    {
        $filter = $this->input->post('tipe');
        if ($filter != 0) {
            $_SESSION['tipe'] = $filter;
        } else {
            unset($_SESSION['tipe']);
        }

        redirect($this->controller);
    }

    public function kategori()
    {
        $filter = $this->input->post('kategori');
        if ($filter != 0) {
            $_SESSION['kategori'] = $filter;
        } else {
            unset($_SESSION['kategori']);
        }

        redirect($this->controller);
    }

    public function insert()
    {
        $this->redirect_hak_akses('u');
        $this->analisis_indikator_model->insert();

        redirect($this->controller);
    }

    public function update($p = 1, $o = 0, $id = 0)
    {
        $this->redirect_hak_akses('u');
        $this->analisis_indikator_model->update($id);

        redirect("{$this->controller}/index/{$p}/{$o}");
    }

    public function delete($p = 1, $o = 0, $id = 0)
    {
        $this->redirect_hak_akses('h');
        $this->analisis_indikator_model->delete($id);

        redirect("{$this->controller}/index/{$p}/{$o}");
    }

    public function delete_all($p = 1, $o = 0)
    {
        $this->redirect_hak_akses('h');
        $this->analisis_indikator_model->delete_all();

        redirect("{$this->controller}/index/{$p}/{$o}");
    }

    public function p_insert($in = '')
    {
        $this->redirect_hak_akses('u');
        $this->analisis_indikator_model->p_insert($in);

        redirect("{$this->controller}/parameter/{$in}");
    }

    public function p_update($in = '', $id = 0)
    {
        $this->redirect_hak_akses('u');
        $this->analisis_indikator_model->p_update($id, $in);

        redirect("{$this->controller}/parameter/{$in}");
    }

    public function p_delete($in = '', $id = 0)
    {
        $this->redirect_hak_akses('h', "{$this->controller}/parameter/{$in}");
        $this->analisis_indikator_model->p_delete($id);

        redirect("{$this->controller}/parameter/{$in}");
    }

    public function p_delete_all($in = '')
    {
        $this->redirect_hak_akses('h', "{$this->controller}/parameter/{$in}");
        $this->analisis_indikator_model->p_delete_all();

        redirect("{$this->controller}/parameter/{$in}");
    }
}
