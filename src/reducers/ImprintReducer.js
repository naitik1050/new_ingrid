import {UPDATE_IMPRINT} from "../actions/types";

const htmlContent = {html: `
<p class="p1"><span class="s1"><strong>Michael Zechmann e.U. / panthera</strong><br />Rennweg 7<br />6020 Innsbruck</span></p>
<p class="p1"><span class="s1">office@panthera.cc<br />UID: ATU71947968</span></p>

<p class="p1"><span class="s1">Mitglied der Wirtschaftskammer &Ouml;sterreich<br />Angaben laut E-Commerce-Gesetz (ECG)</span></p>
<p class="p1"><span class="s1">F&uuml;r den Inhalt verantwortlich: </span><br><span class="s1">Mag. Dr. Michael Zechmann*</span></p>

<p class="p1"><span class="s1">In Kooperation mit:<br />Society for Public Health<br />eingetragener Verein, VRZ: 337094597</span></p>

<p class="p1"><span class="s1">Wichtig f&uuml;r die Benutzung der App</span><br><span class="s1">Diese App ist kein Ersatz f&uuml;r den Besuch bei einem Ern&auml;hrungsberater, Di&auml;tologen oder Arzt. Die App darf nicht als Ersatz f&uuml;r eine professionelle Beratung oder Behandlung durch einen Arzt oder anerkannte Ern&auml;hrungsfachkraft angesehen werden. Die App darf nicht als Grundlage f&uuml;r die Erstellung von Selbstdiagnosen verwendet werden.</span></p>

<p class="p3"><span class="s3"><strong>Programmierung und Design</strong></span><br><a href="http://www.stuffmakers.studio" class="s1">stuffmakers.studio</a></p>

<p class="p3"><span class="s3"><strong>Copyright, </strong></span></p>
<p class="p3"><span class="s3"><strong>Benutzungsbedingung und Haftung</strong></span></p>
<p class="p1"><span class="s1">S&auml;mtliche Inhalte und die Struktur dieser App sind urheberrechtlich gesch&uuml;tzt. Ohne unsere ausdr&uuml;ckliche Zustimmung ist es nicht gestattet, unser Angebot im Ganzen oder in Teilen zu kopieren oder sonstig zu verwenden. F&uuml;r die Richtigkeit und Voll-st&auml;ndigkeit der dargestellten Informationen und der von anderen Diensten &uuml;ber-nommenen Daten wird keine Haftung &uuml;bernommen. Den angebotenen Infor-mationen kommt keine Rechtsverbindlichkeit zu. Haftungsanspr&uuml;che gegen uns, die sich auf Sch&auml;den materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der App oder dargebotenen Informationen bzw. durch die Nutzung fehlerhafter oder unvollst&auml;ndiger Informationen verursacht worden sind, sind grunds&auml;tzlich ausgeschlossen.<br /> Mit der Benutzung dieser App kommt keinerlei Vertragsverh&auml;ltnis zustande, insbesondere kein Auskunftsvertrag, zwischen dem User und uns. Deshalb ergeben sich keine vertraglichen oder quasivertraglichen Anspr&uuml;che gegen uns. Wir behalten uns ausdr&uuml;cklich das Recht vor, Teile der App oder die gesamte App ohne gesonderte Ank&uuml;ndigung zu ver&auml;ndern, zu erg&auml;nzen, zu l&ouml;schen oder die Ver&ouml;ffentlichung zeitweise oder endg&uuml;ltig einzustellen.</span></p>

<p class="p1"><span class="s1">Gerichtsstand: Innsbruck; </span></p>
<p class="p1"><span class="s1">es gilt &ouml;sterreichisches Recht. Trotz sorgf&auml;ltiger Kontrolle &uuml;bernehmen wir keine Gew&auml;hr f&uuml;r die Inhalte externer Links.</span></p>
<p class="p1"><span class="s1">Datenschutzerkl&auml;rung</span></p>

<p class="p1"><span class="s1">* Universit&auml;re akademische Grade:<br /> Mag. rer. nat. (Magister rerum naturalium, Magister der Naturwissenschaft - Biologie)<br /> Dr. phil. (Doctor philosophiae, Doktor der Philosophie - Sprach- und Medienwissenschaften)</span></p>
`};


export default (state = htmlContent, action) => {
    switch (action.type) {
        case UPDATE_IMPRINT:
            return action.payload;
        default:
            return state;
    }
};