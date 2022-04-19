import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Cookies.scss";

const Cookies = () => {
  return (
    <Container className="cookies">
      <Row className="cookies__container">
        <Col className="cookies__container__content">
          <Row className="cookies__container__content__badge">
            <Col className="cookies__container__content__badge__title">
              Cookies
            </Col>
          </Row>
          <Row className="cookies__container__content__infos">
            <Col className="cookies__container__content__infos__description">
              <Row className="cookies__container__content__infos__description__title">
                POLITIQUE RELATIVE AUX COOKIES
              </Row>
              <Row>
                Notre site internet utilise des cookies afin d’analyser le
                parcours de nos utilisateurs et améliorer les fonctionnalités de
                notre interface web. Vous avez la
                possibilité de configurer votre navigateur pour vérifier les
                paramétrages des cookies et décider individuellement de leur
                acceptation ou de leur exclusion. La non-acceptation des cookies
                peut limiter certaines fonctionnalités de notre site internet ou
                de notre application.
              </Row>
              <Row className="cookies__container__content__infos__description__title">
                1 - DÉFINITION DU COOKIE
              </Row>
              <Row>
                Un cookie est un fichier texte déposé sur le navigateur de
                l’internaute par le serveur du site visité ou éventuellement par
                un serveur tiers. Le cookie permet d’identifier et reconnaitre
                un visiteur lors de sa navigation sur un site web grâce à un
                identifiant unique. Au sein de l’ordinateur, les cookies sont
                administrés par le navigateur. Aucune donnée personnelle ne
                transite dans un cookie (nom, prénom, adresse e-mail...).
              </Row>
              <Row className="cookies__container__content__infos__description__title">
                2 - INFORMATIONS SUR LA COLLECTE
              </Row>
              <Row>
                L’usage de cookies par notre site internet nous permet
                principalement d’évaluer l’utilisation générale du site internet
                par les internautes, d’authentifier des utilisateurs, d’établir
                la popularité d’un contenu, d’analyser le trafic du site ainsi
                que l’efficacité des campagnes publicitaires et de comprendre
                les comportements de nos utilisateurs ainsi que leurs intérêts
                pour nos services. Nous mesurons par exemple : la fréquence de
                visite de certaines pages du site, les durées de sessions, le
                profil de nos utilisateurs. Ceci à des fins d’amélioration de la
                qualité de notre site internet.
              </Row>
              <Row className="cookies__container__content__infos__description__title">
                3 - COOKIES ÉMIS PAR PAARK
              </Row>
              <Row>
                Cookies liés à l’utilisation de notre site internet : Ce sont
                des cookies strictement nécessaires ou liés aux fonctionnalités
                et qui sont indispensables à l’utilisation du site internet. Ces
                cookies vont vous permettre d’utiliser les fonctionnalités de
                base, de naviguer entre les différentes pages, de vous
                identifier et vous permettre d’accéder de façon sécurisée à
                votre compte ainsi qu’à vos données personnelles.
              </Row>
              <Row className="cookies__container__content__infos__description__title">
                4 - COOKIES ÉMANANT DE TIERS
              </Row>
              <Row>
                Ce sont des cookies qui ne sont pas déposés par PAARK, mais par
                des sociétés tierces. Ils sont cependant validés par PAARK. Ces
                cookies visent principalement à comprendre et analyser le
                comportement des internautes au sein de notre site internet et à
                permettre de personnaliser les offres publicitaires que nos
                partenaires peuvent vous adresser. Cookies d’analyse, de
                performances et de mesure d’audience : Ces cookies permettent de
                générer des données anonymes nous permettant d’analyser les
                performances de notre site internet, détecter les
                dysfonctionnements et d’étudier les comportements en vue
                d’améliorer l’expérience de nos utilisateurs. PAARK utilise
                Google Analytics et Google Ads. Cookies publicitaires : Ces
                cookies nous permettent de mieux connaitre nos internautes
                (intérêts, habitudes, comportement) afin de leur adresser des
                messages publicitaires adaptés et personnalisés.
              </Row>
              <Row className="cookies__container__content__infos__description__title">
                5 - OPPOSITION À L’UTILISATION DES COOKIES
              </Row>
              <Row>
                Vous pouvez accepter ou refuser certains cookies en paramétrant
                votre navigateur. Il vous est ainsi possible :
                <br />- d’enregistrer systématiquement tous les cookies
                <br />- de configurer votre navigateur afin qu’il vous permettre
                d’accepter ou de refuser les cookies qui vous sont proposés
                régulièrement sur chacun des sites que vous visitez :
                <br />
                Voici les instructions pour les navigateurs de bureau : <br />·
                Google Chrome <br />· Firefox <br />· Safari <br />· Internet
                Explorer <br />
                Voici les instructions pour les navigateurs mobiles : <br />·
                Google Chrome sur Android <br />· Firefox sur Android <br />·
                Safari sur iOS <br />
                Pour empêcher Google Analytics de vous suivre sur tous les sites
                web, consultez http://tools.google.com/dlpage/gaoptout. <br />-
                de refuser systématiquement tous les cookies. Dans ce cas, PAARK
                décline toute responsabilité concernant des éventuels
                dysfonctionnements ou la difficulté à utiliser certaines
                fonctionnalités. Pour toute question concernant notre politique
                d’utilisation des cookies, vous pouvez contacter :
                contact@paark.fr
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Cookies;
