function handleLocalization(srcLocalizations) {
	let localizations = Array(srcLocalizations.length);

	for (let i = 0; i < srcLocalizations.length; i++) {
		switch (srcLocalizations[i]) {
			case "hosting/linguaveneta/LV_VE.gif":
				localizations[i] = "Venezia";
				break;
			case "hosting/linguaveneta/LV_PD.gif":
				localizations[i] = "Veneto Centrale o Bassa Padovana";
				break;
			case "hosting/linguaveneta/LV_TF.gif":
				localizations[i] = "Veneto Orientale";
				break;
			case "hosting/linguaveneta/LV_VR.gif":
				localizations[i] = "Veronexe";
				break;
			case "hosting/linguaveneta/LV_VI.gif":
				localizations[i] = "Alto Visentin";
				break;
			case "hosting/linguaveneta/LV_TV.gif":
				localizations[i] = "Feltrin-Belunexe";
				break;
			case "hosting/linguaveneta/LV_TN.gif":
				localizations[i] = "Trentin Orientale";
				break;
			case "hosting/linguaveneta/LV_TS.gif":
				localizations[i] = "IstroVeneto-Dàlmata";
				break;
			case "hosting/linguaveneta/LV_BL.gif":
				localizations[i] = "Dolomìtega";
				break;
			default:
				localizations[i] = "";
				break;
		}
	}

	return localizations;
}

export default handleLocalization;
