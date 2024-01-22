package demin.d.utilitiesback.contracts.utilities.base64;

import lombok.Getter;

@Getter
public class Base64ConvertedString {
    private final String value;

    public Base64ConvertedString(String value){
        this.value = value;
    }
}
