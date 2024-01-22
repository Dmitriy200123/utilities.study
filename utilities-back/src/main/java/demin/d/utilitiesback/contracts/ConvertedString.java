package demin.d.utilitiesback.contracts;

import lombok.Getter;

@Getter
public class ConvertedString {
    private String value;
    private final StringConvertType convertType;

    public ConvertedString(String value, StringConvertType convertType){
        this.value = value;
        this.convertType = convertType;
    }
}
