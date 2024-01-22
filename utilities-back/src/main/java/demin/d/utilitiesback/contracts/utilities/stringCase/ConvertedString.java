package demin.d.utilitiesback.contracts.utilities.stringCase;

import lombok.Getter;

@Getter
public class ConvertedString {
    private final String value;
    private final StringConvertType convertType;

    public ConvertedString(String value, StringConvertType convertType){
        this.value = value;
        this.convertType = convertType;
    }
}
