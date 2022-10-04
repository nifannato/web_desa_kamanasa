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

class Line extends Admin_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('plan_line_model');
        $this->modul_ini     = 9;
        $this->sub_modul_ini = 8;
    }

    public function clear()
    {
        unset($_SESSION['cari'], $_SESSION['filter']);

        redirect($this->controller);
    }

    public function index($p = 1, $o = 0)
    {
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

        if (isset($_POST['per_page'])) {
            $_SESSION['per_page'] = $_POST['per_page'];
        }

        $data['per_page'] = $_SESSION['per_page'];
        $data['paging']   = $this->plan_line_model->paging($p, $o);
        $data['main']     = $this->plan_line_model->list_data($o, $data['paging']->offset, $data['paging']->per_page);
        $data['keyword']  = $this->plan_line_model->autocomplete();
        $data['tip']      = 2;

        $this->render('line/table', $data);
    }

    public function form($p = 1, $o = 0, $id = '')
    {
        $this->redirect_hak_akses('u');
        $data['p'] = $p;
        $data['o'] = $o;

        if ($id) {
            $data['line']        = $this->plan_line_model->get_line($id) ?? show_404();
            $data['form_action'] = site_url("{$this->controller}/update/{$id}/{$p}/{$o}");
        } else {
            $data['line']        = null;
            $data['form_action'] = site_url("{$this->controller}/insert");
        }

        $data['tip'] = 2;

        $this->render('line/form', $data);
    }

    public function sub_line($line = 1)
    {
        $data['subline'] = $this->plan_line_model->list_sub_line($line);
        $data['line']    = $this->plan_line_model->get_line($line);
        $data['tip']     = 2;
        $this->render('line/sub_line_table', $data);
    }

    public function ajax_add_sub_line($line = 0, $id = 0)
    {
        $this->redirect_hak_akses('u');
        if ($id) {
            $data['line']        = $this->plan_line_model->get_line($id) ?? show_404();
            $data['form_action'] = site_url("{$this->controller}/update_sub_line/{$line}/{$id}");
        } else {
            $data['line']        = null;
            $data['form_action'] = site_url("{$this->controller}/insert_sub_line/{$line}");
        }

        $this->load->view('line/ajax_add_sub_line_form', $data);
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

    public function insert($tip = 1)
    {
        $this->redirect_hak_akses('u');
        $this->plan_line_model->insert($tip);

        redirect("{$this->controller}/index/{$tip}");
    }

    public function update($id = '', $p = 1, $o = 0)
    {
        $this->redirect_hak_akses('u');
        $this->plan_line_model->update($id);

        redirect("{$this->controller}/index/{$p}/{$o}");
    }

    public function delete($p = 1, $o = 0, $id = '')
    {
        $this->redirect_hak_akses('h');
        $this->plan_line_model->delete($id);

        redirect("{$this->controller}/index/{$p}/{$o}");
    }

    public function delete_all($p = 1, $o = 0)
    {
        $this->redirect_hak_akses('h');
        $this->plan_line_model->delete_all();

        redirect("{$this->controller}/index/{$p}/{$o}");
    }

    public function line_lock($id = '')
    {
        $this->redirect_hak_akses('u');
        $this->plan_line_model->line_lock($id, 1);

        redirect($this->controller);
    }

    public function line_unlock($id = '')
    {
        $this->redirect_hak_akses('u');
        $this->plan_line_model->line_lock($id, 2);

        redirect($this->controller);
    }

    public function insert_sub_line($line = '')
    {
        $this->redirect_hak_akses('u');
        $this->plan_line_model->insert_sub_line($line);

        redirect("{$this->controller}/sub_line/{$line}");
    }

    public function update_sub_line($line = '', $id = '')
    {
        $this->redirect_hak_akses('u');
        $this->plan_line_model->update_sub_line($id);

        redirect("{$this->controller}/sub_line/{$line}");
    }

    public function delete_sub_line($line = '', $id = '')
    {
        $this->redirect_hak_akses('h');
        $this->plan_line_model->delete_sub_line($id);

        redirect("{$this->controller}/sub_line/{$line}");
    }

    public function delete_all_sub_line($line = '')
    {
        $this->redirect_hak_akses('h');
        $this->plan_line_model->delete_all_sub_line();

        redirect("{$this->controller}/sub_line/{$line}");
    }

    public function line_lock_sub_line($line = '', $id = '')
    {
        $this->redirect_hak_akses('u');
        $this->plan_line_model->line_lock($id, 1);

        redirect("{$this->controller}/sub_line/{$line}");
    }

    public function line_unlock_sub_line($line = '', $id = '')
    {
        $this->redirect_hak_akses('u');
        $this->plan_line_model->line_lock($id, 2);

        redirect("{$this->controller}/sub_line/{$line}");
    }
}
