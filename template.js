const template_file = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<vsq4 xmlns="http://www.yamaha.co.jp/vocaloid/schema/vsq4/"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.yamaha.co.jp/vocaloid/schema/vsq4/ vsq4.xsd">
	<vender><![CDATA[Yamaha corporation]]></vender>
	<version><![CDATA[4.0.0.3]]></version>
	<vVoiceTable>
		<vVoice>
			<bs>4</bs>
			<pc>0</pc>
			<id><![CDATA[BK8H76TAEHXWSKDB]]></id>
			<name><![CDATA[Luotianyi_CHN_Meng]]></name>
			<vPrm>
				<bre>0</bre>
				<bri>0</bri>
				<cle>0</cle>
				<gen>0</gen>
				<ope>0</ope>
			</vPrm>
		</vVoice>
	</vVoiceTable>
	<mixer>
		<masterUnit>
			<oDev>0</oDev>
			<rLvl>0</rLvl>
			<vol>0</vol>
		</masterUnit>
		<vsUnit>
			<tNo>0</tNo>
			<iGin>0</iGin>
			<sLvl>-898</sLvl>
			<sEnable>0</sEnable>
			<m>0</m>
			<s>0</s>
			<pan>64</pan>
			<vol>0</vol>
		</vsUnit>
		<monoUnit>
			<iGin>0</iGin>
			<sLvl>-898</sLvl>
			<sEnable>0</sEnable>
			<m>0</m>
			<s>0</s>
			<pan>64</pan>
			<vol>0</vol>
		</monoUnit>
		<stUnit>
			<iGin>0</iGin>
			<m>0</m>
			<s>0</s>
			<vol>-129</vol>
		</stUnit>
	</mixer>
	<masterTrack>
		<seqName><![CDATA[Untitled0]]></seqName>
		<comment><![CDATA[New VSQ File]]></comment>
		<resolution>480</resolution>
		<preMeasure>1</preMeasure>
		<timeSig><m>0</m><nu><%-BEAT_COUNT-%></nu><de><%-BEAT_TYPE-%></de></timeSig>
		<tempo><t>0</t><v><%-TEMPO-%></v></tempo>
	</masterTrack>
	<vsTrack>
		<tNo>0</tNo>
		<name><![CDATA[Track]]></name>
		<comment><![CDATA[Track]]></comment>
		<vsPart>
			<t>1920</t>
			<playTime>61440</playTime>
			<name><![CDATA[NewPart]]></name>
			<comment><![CDATA[New Musical Part]]></comment>
			<sPlug>
				<id><![CDATA[ACA9C502-A04B-42b5-B2EB-5CEA36D16FCE]]></id>
				<name><![CDATA[VOCALOID2 Compatible Style]]></name>
				<version><![CDATA[3.0.0.1]]></version>
			</sPlug>
			<pStyle>
				<v id="accent">50</v>
				<v id="bendDep">8</v>
				<v id="bendLen">0</v>
				<v id="decay">50</v>
				<v id="fallPort">0</v>
				<v id="opening">127</v>
				<v id="risePort">0</v>
			</pStyle>
			<singer>
				<t>0</t>
				<bs>4</bs>
				<pc>0</pc>
            </singer>
            <%-NOTES-%>
			<plane>0</plane>
		</vsPart>
	</vsTrack>
	<monoTrack>
	</monoTrack>
	<stTrack>
	</stTrack>
	<aux>
		<id><![CDATA[AUX_VST_HOST_CHUNK_INFO]]></id>
		<content><![CDATA[VlNDSwAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=]]></content>
	</aux>
</vsq4>
`

const template_note = `
            <note>
				<t><%-NOTE_START-%></t>
				<dur><%-NOTE_LENGTH-%></dur>
				<n><%-NOTE_PITCH-%></n>
				<v>64</v>
				<y><![CDATA[a]]></y>
				<p><![CDATA[a]]></p>
				<nStyle>
					<v id="accent">50</v>
					<v id="bendDep">0</v>
					<v id="bendLen">0</v>
					<v id="decay">50</v>
					<v id="fallPort">0</v>
					<v id="opening">127</v>
					<v id="risePort">0</v>
					<v id="vibLen">66</v>
					<v id="vibType">1</v>
				</nStyle>
            </note>`
            
module.exports = {
    template_file,
    template_note
}