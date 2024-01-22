package demin.d.utilitiesback.contracts.utilities.base64;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StringBase64ConversionRequest {
    private String stringToConvert;

    private StringBase64ConversionRequestType type;
}
