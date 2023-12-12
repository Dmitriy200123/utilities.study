package demin.d.utilitiesback.contracts;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ConvertedStrings {
    private List<ConvertedString> items;

    public ConvertedStrings(List<ConvertedString> items){
        this.items = items;
    }
}
