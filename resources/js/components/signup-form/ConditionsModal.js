import * as React from 'react';
import {Modal} from "antd";
import {useState} from "react";

export function ConditionsModal() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      J’accepte les <span onClick={()=>setVisible(true)} style={{
      fontWeight: "bold",
      color: "var(--primary-color)"
    }}>condition générales</span>
      <Modal
        title="Nos conditions générales"
        centered
        visible={visible}
        okText={"J'accepte"}
        cancelText={"Je n'accepte pas"}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
}

export default ConditionsModal;