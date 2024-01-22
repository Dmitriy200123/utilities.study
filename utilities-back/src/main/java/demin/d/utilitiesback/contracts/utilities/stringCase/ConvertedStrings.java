package demin.d.utilitiesback.contracts.utilities.stringCase;

import lombok.Getter;

import java.util.List;

@Getter
public class ConvertedStrings {
    private final List<ConvertedString> items;

    public ConvertedStrings(List<ConvertedString> items){
        this.items = items;
    }
}
