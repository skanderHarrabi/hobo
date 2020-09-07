import * as React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import html2canvas from "html2canvas";
import LayoutTwo from "../../components/layout-two/LayoutTwo";
import NamingLogo from "../../components/svg/NamingLogo";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { getVoucher } from "../../actions/question-actions/actions";
import Gif from "../../img/gifx.gif";
import "./voucher-page.scss";
import { useState } from "react";
import { useEffect } from "react";

const VoucherPage = props => {
  const suggestionsPicks = useSelector(
    state => state.questionsReducer.suggestionsPick
  );
  const wonVoucher = useSelector(state => state.questionsReducer.wonVoucher);
  const user = useSelector(state => state.authReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.picked) {
      props.history.push("/");
    }
  }, [user]);
  return (
    <LayoutTwo preventOverflow={true}>
      <div className="voucher-page">
        <NamingLogo />
        <div className="voucher-page-content">
          <p className="voucher-text">
            {" "}
            سامحني على الأغلاط راني ما نحكيش تونسي بالباهي
          </p>
          <p className="voucher-text">مازلت كي تعلّمتو من الديجيتال</p>
          <img className="img" alt="img" src={Gif} />
          <p className="voucher-text">و الدجااااج جانا من غادي!</p>
          {wonVoucher ? <ImgModal wonVoucher={wonVoucher} /> : null}

          <Button
            onClick={() => dispatch(getVoucher(suggestionsPicks))}
            type="primary"
            htmlType="submit"
            className="submit-button"
          >
            Téléchargez Bon d’achat
          </Button>
        </div>
      </div>
    </LayoutTwo>
  );
};

export default withRouter(VoucherPage);

const ImgModal = ({ wonVoucher }) => {
  const user = useSelector(state => state.authReducer.user);
  const code = useSelector(state => state.questionsReducer.code);
  const [visible, setVisible] = useState(true);
  const takeScreenShot = () => {
    let node = document.getElementById("capture");
    html2canvas(node).then(canvas => {
      var dataurl = canvas.toDataURL("image/png");
      let link = document.createElement("a");
      link.href = dataurl;
      link.download = "voucher.png";
      link.click();
    });

    /*domtoimage
      .toJpeg(node)
      .then(function(dataUrl) {
        let link = document.createElement("a");
        link.download = "voucher.jpeg";
        link.href = dataUrl;
        setTimeout(() => {
          setVisible(false);
          link.click();
        }, 3000);
      })
      .catch(function(error) {
        setTimeout(() => {
          setVisible(false);
        }, 3000);
        console.error("oops, something went wrong!", error);
      });*/
  };

  return (
    <Modal
      isOpen={visible}
      onRequestClose={() => setVisible(false)}
      riaHideApp={false}
      style={{
        overlay: {
          position: "fixed",
          height: "auto",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)"
        },
        content: {
          position: "absolute",
          top: "40px",
          left: "40px",
          right: "40px",
          bottom: "40px",
          border: 0,
          background: "#fff",
          overflow: "hidden",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "0"
        }
      }}
    >
      <div className="img-content">
        <div className="helper">
          مبرووك! ما تنساش تعمل capture d’écran و تجيبها معاك لل Store!
        </div>
        <div id="capture" className="voucher-image" onClick={takeScreenShot}>
          <img
            crossOrigin="anonymous"
            id="img"
            onLoad={() => {
              let img = document.getElementById("img");
              document.getElementsByClassName(
                "ReactModal__Overlay"
              )[0].style.height = img.height;
              takeScreenShot();
            }}
            src={`${process.env.MIX_APP_URL}/images/${wonVoucher}.png`}
            alt={"voucher"}
          />
          <span>{user.name}</span>
          <span className="code"># {code.id}</span>
        </div>
      </div>
    </Modal>
  );
};
