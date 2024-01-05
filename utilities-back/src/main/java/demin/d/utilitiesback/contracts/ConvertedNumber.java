package demin.d.utilitiesback.contracts;

import lombok.Getter;

@Getter
public class ConvertedNumber {
    private final String value;

    public ConvertedNumber(String value) {
        this.value = value;
    }
}
