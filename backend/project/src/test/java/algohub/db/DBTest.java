package algohub.db;

import algohub.domain.algorithm.AlgoCategory;
import algohub.service.algorithm.AlgoCategoryService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.List;

public class DBTest {


    AlgoCategoryService algoCategoryService;

    @Autowired
    public DBTest(AlgoCategoryService algoCategoryService) {
        this.algoCategoryService = algoCategoryService;
    }

    @Autowired
    private DataSource ds;

    @Test
    public void test() {
        List<AlgoCategory> algoCategory = algoCategoryService.getAlgoCategory();
        for (AlgoCategory category : algoCategory) {
            System.out.println(category.getP_category());
        }
    }

    @Test
    public void testDB() throws Exception {

        try (Connection con = ds.getConnection()) {
            System.out.println(con);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Test
    public void test1() {
        AlgoCategory test1 = new AlgoCategory();
        test1.setP_category("그리드");
        Assertions.assertThat(test1.getP_category()).isEqualTo("그리드");
    }
}
