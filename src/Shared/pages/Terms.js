import "../../css/terms.css";
import React from "react";
import logo from "../../logo.png";
import { Container, Row, Col, Card } from "react-bootstrap";

const Terms = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <div className="top-image-container">
            <img className="logo-nana" src={logo} alt="" />
          </div>
          <Card className="mb-4">
            <Card.Header as="h3">Términos de Servicio</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Aceptación de los Términos</strong>
                <br />
                Al registrarte en Nana Pass, aceptas cumplir con los términos y
                condiciones establecidos en este documento. Si no estás de
                acuerdo con estos términos, no debes utilizar nuestros
                servicios.
              </Card.Text>
              <Card.Text>
                <strong>Descripción del Servicio</strong>
                <br />
                Nana Pass es una billetera digital social que permite a los
                usuarios realizar donaciones a personas en riesgo de exclusión
                social. Nos reservamos el derecho de modificar o discontinuar el
                servicio en cualquier momento, con o sin previo aviso.
              </Card.Text>
              <Card.Text>
                <strong>Registro de Usuario</strong>
                <br />
                Para utilizar Nana Pass, debes registrarte y proporcionar
                información personal veraz y completa. Eres responsable de
                mantener la confidencialidad de tu cuenta y contraseña y de
                todas las actividades que ocurran bajo tu cuenta.
              </Card.Text>
              <Card.Text>
                <strong>Uso Aceptable</strong>
                <br />
                Te comprometes a utilizar Nana Pass de manera legal y ética. No
                debes utilizar el servicio para actividades fraudulentas,
                ilegales o que violen los derechos de otros usuarios.
              </Card.Text>
              <Card.Text>
                <strong>Propiedad Intelectual</strong>
                <br />
                Todos los contenidos, marcas comerciales, logotipos y otros
                materiales incluidos en Nana Pass están protegidos por derechos
                de propiedad intelectual y son propiedad de sus respectivos
                dueños. No debes utilizar estos materiales sin el permiso
                correspondiente.
              </Card.Text>
              <Card.Text>
                <strong>Limitación de Responsabilidad</strong>
                <br />
                Nana Pass no se hace responsable de los daños directos,
                indirectos, incidentales, especiales, consecuentes o ejemplares
                que puedan resultar del uso del servicio. Esto incluye, pero no
                se limita a, daños por pérdida de beneficios, datos u otras
                pérdidas intangibles.
              </Card.Text>
              <Card.Text>
                <strong>Modificaciones de los Términos</strong>
                <br />
                Nos reservamos el derecho de modificar estos términos en
                cualquier momento. Las modificaciones serán efectivas
                inmediatamente después de su publicación en nuestro sitio web.
                Tu uso continuado del servicio después de la publicación de
                cualquier cambio constituye tu aceptación de dichos cambios.
              </Card.Text>
              <Card.Text>
                <strong>Terminación del Servicio</strong>
                <br />
                Nos reservamos el derecho de suspender o terminar tu acceso a
                Nana Pass en cualquier momento, por cualquier motivo, sin previo
                aviso.
              </Card.Text>
              <Card.Text>
                <strong>Ley Aplicable</strong>
                <br />
                Estos términos se regirán e interpretarán de acuerdo con las
                leyes del país en el que operamos, sin tener en cuenta sus
                disposiciones sobre conflictos de leyes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <Card>
            <Card.Header as="h3">Declaración de Privacidad</Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Recopilación de Información</strong>
                <br />
                Recopilamos información personal que nos proporcionas al
                registrarte, como tu nombre, dirección de correo electrónico,
                número de teléfono y cualquier otra información que decidas
                compartir con nosotros.
              </Card.Text>
              <Card.Text>
                <strong>Uso de la Información</strong>
                <br />
                Utilizamos la información recopilada para proporcionar y mejorar
                nuestros servicios, comunicarnos contigo, personalizar tu
                experiencia y cumplir con nuestras obligaciones legales.
              </Card.Text>
              <Card.Text>
                <strong>Compartir Información</strong>
                <br />
                No compartimos tu información personal con terceros, excepto
                cuando sea necesario para proporcionar el servicio, cumplir con
                la ley o proteger nuestros derechos.
              </Card.Text>
              <Card.Text>
                <strong>Seguridad de la Información</strong>
                <br />
                Implementamos medidas de seguridad adecuadas para proteger tu
                información personal contra el acceso no autorizado, alteración,
                divulgación o destrucción. Sin embargo, no podemos garantizar la
                seguridad absoluta de tu información.
              </Card.Text>
              <Card.Text>
                <strong>Acceso y Control de tu Información</strong>
                <br />
                Puedes acceder, actualizar o eliminar tu información personal en
                cualquier momento a través de tu cuenta en Nana Pass. Si tienes
                alguna pregunta o necesitas asistencia, puedes contactarnos a
                través de nuestros canales de soporte.
              </Card.Text>
              <Card.Text>
                <strong>Cambios en la Declaración de Privacidad</strong>
                <br />
                Nos reservamos el derecho de modificar esta declaración de
                privacidad en cualquier momento. Las modificaciones serán
                efectivas inmediatamente después de su publicación en nuestro
                sitio web. Te notificaremos de cualquier cambio significativo a
                través de nuestro servicio o por otros medios.
              </Card.Text>
              <Card.Text>
                <strong>Contacto</strong>
                <br />
                Si tienes alguna pregunta o inquietud sobre estos términos o
                nuestra declaración de privacidad, por favor contáctanos a
                través de nuestro sitio web o a la dirección de correo
                electrónico proporcionada.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <p className="mt-5 mb-3 text-muted">&copy; NanaPass-2024</p>
    </Container>
  );
};

export default Terms;
