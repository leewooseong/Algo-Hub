import React from "react";
import { Link } from "react-router-dom";
import "../styles/Modal.css";

export default class Modal extends React.Component {
  render() {
    const { open, header, close } = this.props;
    return (
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>{this.props.children}</main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  }
}
