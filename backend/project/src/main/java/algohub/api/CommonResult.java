package algohub.api;

import lombok.Getter;
import lombok.Setter;

// 미사용
@Getter
@Setter
public class CommonResult {
    //private boolean success;
    private int statusCode;
    private String message;
}
