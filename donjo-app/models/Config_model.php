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

class Config_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_data()
    {
        $this->db->reset_query(); // TODO: cari query yg menggantung terkait pemanggilan first/dpt

        return $this->db
            ->select('c.*, u.pamong_nip AS nip_kepala_desa')
            ->select('(case when p.nama is not null then p.nama else u.pamong_nama end) AS nama_kepala_desa')
            ->from('config c')
            ->join('tweb_desa_pamong u', 'c.pamong_id = u.pamong_id', 'left')
            ->join('tweb_penduduk p', 'u.id_pend = p.id', 'left')
            ->get()
            ->row_array();
    }

    public function insert()
    {
        $data       = $this->bersihkan_post();
        $data['id'] = 1; // Hanya ada satu row data desa
        // Data lokasi peta default. Diperlukan untuk menampilkan widget peta lokasi
        $data['lat']      = '-8.488005310891758';
        $data['lng']      = '116.0406072534065';
        $data['zoom']     = '19';
        $data['map_tipe'] = 'roadmap';
        unset($data['old_logo'], $data['old_kantor_desa']);

        $data['logo']        = $this->upload_gambar_desa('logo');
        $data['kantor_desa'] = $this->upload_gambar_desa('kantor_desa');
        if (! empty($data['logo'])) {
            // Ada logo yang berhasil diunggah --> simpan ukuran 100 x 100
            $tipe_file = TipeFile($_FILES['logo']);
            $dimensi   = ['width' => 100, 'height' => 100];
            resizeImage(LOKASI_LOGO_DESA . $data['logo'], $tipe_file, $dimensi);
            resizeImage(LOKASI_LOGO_DESA . $data['logo'], $tipe_file, ['width' => 16, 'height' => 16], LOKASI_LOGO_DESA . 'favicon.ico');
        } else {
            unset($data['logo']);
        }
        unset($data['file_logo'], $data['file_kantor_desa']);

        $outp = $this->db->insert('config', $data);
        status_sukses($outp); //Tampilkan Pesan
    }

    // TODO: tambahkan validasi di form Identitas Desa
    private function bersihkan_post()
    {
        $post                      = $this->input->post();
        $data['old_logo']          = $post['old_logo'];
        $data['old_kantor_desa']   = $post['old_kantor_desa'];
        $data['nama_desa']         = nama_terbatas($post['nama_desa']);
        $data['kode_desa']         = bilangan($post['kode_desa']);
        $data['kode_pos']          = bilangan($post['kode_pos']);
        $data['pamong_id']         = bilangan($post['pamong_id']);
        $data['alamat_kantor']     = alamat($post['alamat_kantor']);
        $data['email_desa']        = email($post['email_desa']);
        $data['telepon']           = bilangan($post['telepon']);
        $data['website']           = alamat_web($post['website']);
        $data['nama_kecamatan']    = nama_terbatas($post['nama_kecamatan']);
        $data['kode_kecamatan']    = bilangan($post['kode_kecamatan']);
        $data['nama_kepala_camat'] = nama($post['nama_kepala_camat']);
        $data['nip_kepala_camat']  = nomor_surat_keputusan($post['nip_kepala_camat']);
        $data['nama_kabupaten']    = nama($post['nama_kabupaten']);
        $data['kode_kabupaten']    = bilangan($post['kode_kabupaten']);
        $data['nama_propinsi']     = nama_terbatas($post['nama_propinsi']);
        $data['kode_propinsi']     = bilangan($post['kode_propinsi']);
        $data['warna']             = warna($post['warna']);

        return $data;
    }

    public function update($id = 0)
    {
        $_SESSION['success']   = 1;
        $_SESSION['error_msg'] = '';

        $data                = $this->bersihkan_post();
        $data['logo']        = $this->upload_gambar_desa('logo');
        $data['kantor_desa'] = $this->upload_gambar_desa('kantor_desa');

        if (! empty($data['logo'])) {
            // Ada logo yang berhasil diunggah --> simpan ukuran 100 x 100
            $tipe_file = TipeFile($_FILES['logo']);
            $dimensi   = ['width' => 100, 'height' => 100];
            resizeImage(LOKASI_LOGO_DESA . $data['logo'], $tipe_file, $dimensi);
            resizeImage(LOKASI_LOGO_DESA . $data['logo'], $tipe_file, ['width' => 16, 'height' => 16], LOKASI_LOGO_DESA . 'favicon.ico');
            // Hapus berkas logo lama
            if (! empty($data['old_logo'])) {
                unlink(LOKASI_LOGO_DESA . $data['old_logo']);
            }
        } else {
            unset($data['logo']);
        }

        if (empty($data['kantor_desa'])) {
            unset($data['kantor_desa']);
        }

        unset($data['file_logo'], $data['old_logo'], $data['file_kantor_desa'], $data['old_kantor_desa']);

        $this->db->where('id', $id)->update('config', $data);

        // Ubah jabatan pamong saat ditetapkan sebagai kepala desa
        $kades = ucwords($this->setting->sebutan_kepala_desa);

        $outp = $this->db
            ->where('pamong_id', $this->session->kades_lama)
            ->update('tweb_desa_pamong', ['jabatan' => null, 'pamong_status' => 0, 'pamong_ttd' => 0]);
        $this->session->unset_userdata('kades_lama');

        $outp = $this->db
            ->where('pamong_id', $data['pamong_id'])
            ->update('tweb_desa_pamong', ['jabatan' => $kades, 'urut' => 1, 'pamong_status' => 1, 'pamong_ttd' => 1]);
        status_sukses($outp); //Tampilkan Pesan
    }

    /*
        Returns:
            - success: nama berkas yang diunggah
            - fail: NULL
    */
    private function upload_gambar_desa($jenis)
    {
        $this->load->library('upload');
        $this->uploadConfig = [
            'upload_path'   => LOKASI_LOGO_DESA,
            'allowed_types' => 'gif|jpg|jpeg|png',
            'max_size'      => max_upload() * 1024,
        ];
        // Adakah berkas yang disertakan?
        $adaBerkas = ! empty($_FILES[$jenis]['name']);
        if ($adaBerkas !== true) {
            return null;
        }
        // Tes tidak berisi script PHP
        if (isPHP($_FILES['logo']['tmp_name'], $_FILES[$jeniss]['name'])) {
            $_SESSION['error_msg'] .= ' -> Jenis file ini tidak diperbolehkan ';
            $_SESSION['success'] = -1;
            redirect('identitas_desa');
        }

        $uploadData = null;
        // Inisialisasi library 'upload'
        $this->upload->initialize($this->uploadConfig);
        // Upload sukses
        if ($this->upload->do_upload($jenis)) {
            $uploadData = $this->upload->data();
            // Buat nama file unik agar url file susah ditebak dari browser
            $namaFileUnik = tambahSuffixUniqueKeNamaFile($uploadData['file_name']);
            // Ganti nama file asli dengan nama unik untuk mencegah akses langsung dari browser
            $fileRenamed = rename(
                $this->uploadConfig['upload_path'] . $uploadData['file_name'],
                $this->uploadConfig['upload_path'] . $namaFileUnik
            );
            // Ganti nama di array upload jika file berhasil di-rename --
            // jika rename gagal, fallback ke nama asli
            $uploadData['file_name'] = $fileRenamed ? $namaFileUnik : $uploadData['file_name'];
        }
        // Upload gagal
        else {
            $_SESSION['success']   = -1;
            $_SESSION['error_msg'] = $this->upload->display_errors(null, null);
        }

        return (! empty($uploadData)) ? $uploadData['file_name'] : null;
    }

    public function update_kantor()
    {
        $data = $_POST;
        $id   = '1';
        $this->db->where('id', $id);
        $outp = $this->db->update('config', $data);

        status_sukses($outp); //Tampilkan Pesan
    }

    public function update_wilayah()
    {
        $data = $_POST;
        $id   = '1';
        $this->db->where('id', $id);
        $outp = $this->db->update('config', $data);

        status_sukses($outp); //Tampilkan Pesan
    }

    public function kosongkan_path($id)
    {
        $this->db
            ->set('path', null)
            ->where('id', $id)
            ->update('config');
    }
}
