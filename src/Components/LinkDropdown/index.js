import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LinkDropdown } from "../../Style";

export default function Dropdown() {
  const me = useSelector(state => state.user.me);
  const user = useSelector(state => state.user.user);
  const [webmail, setWebmail] = useState("");
  const [timed, setTimed] = useState("");

  useEffect(() => {
    if (me === 1) {
      setWebmail("https://webmail-seguro.com.br/heat.org.br");
      setTimed("http://10.42.112.14:8080/heat/pages/painel.do");
    } else {
      setTimed("http://10.42.112.13:7050/hepjbc/pages/painel.do");
      setWebmail("https://webmail-seguro.com.br/hejbc.org.br");
    }
  }, [me]);
  return (
    <LinkDropdown>
      <ul>
        <li className="dropdown">
          <a href="http://10.42.112.48/" className="dropbtn">
            Sites Úteis
          </a>
          <div className="dropdown-content">
            <a target="_blank" rel="noopener noreferrer" href={webmail}>
              WEBMAIL
            </a>
            <a target="_blank" rel="noopener noreferrer" href={timed}>
              F71
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://10.42.112.91:8085/PD/login"
            >
              MEDILAB
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://10.42.111.12/apoio/"
            >
              MVSOUL PRD
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://10.42.111.12/mvpep/"
            >
              MVPEP PRD
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://10.42.112.130:82/apoio/"
            >
              MVSOUL TRN
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://10.42.112.130:82/mvpep/"
            >
              MVPEP TRN
            </a>
            {user.tp_usuario === "A" ? (
              <>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"https://portalcliente.mv.com.br"}
                >
                  PORTAL MV
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    "https://account.meraki.com/secure/login/dashboard_login"
                  }
                >
                  MERAKI CISCO
                </a>{" "}
              </>
            ) : null}
          </div>
        </li>
      </ul>
    </LinkDropdown>
  );
}
