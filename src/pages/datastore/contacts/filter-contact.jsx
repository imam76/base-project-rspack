import { Modal } from 'antd';
import { useNavigate } from 'react-router';

export default function FilterContact() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <Modal open={true} onCancel={handleClose} footer={null}>
      <h2>Filter</h2>
      {/* Konten filter bisa pakai form antd */}
      asdasdasdasd
    </Modal>
  );
}
