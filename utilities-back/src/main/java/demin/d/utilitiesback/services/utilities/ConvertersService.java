package demin.d.utilitiesback.services.utilities;

import demin.d.utilitiesback.contracts.utilities.base64.Base64ConvertedString;
import demin.d.utilitiesback.contracts.utilities.base64.StringBase64ConversionRequest;
import demin.d.utilitiesback.contracts.utilities.numberNotation.ConvertedNumber;
import demin.d.utilitiesback.contracts.utilities.numberNotation.NumberNotationRequest;
import demin.d.utilitiesback.contracts.utilities.stringCase.ConvertedStrings;
import demin.d.utilitiesback.contracts.utilities.stringCase.StringConversionRequest;

import java.util.List;

public interface ConvertersService {
    ConvertedNumber ConvertToNumberNotation(NumberNotationRequest numberNotationRequest);

    List<Integer> GetNumberNotations();

    Base64ConvertedString ConvertStringToBase64AndBack(StringBase64ConversionRequest base64ConversionRequest);

    ConvertedStrings ConvertStringToCase(StringConversionRequest stringConversionRequest);
}
