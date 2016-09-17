<div class="container" id="homepage-form">
    <div class="row">
        <div class="col-sm-12">
            <h3>Create an item</h3>
            <form action="" method="POST">
                <div class="form-group">
                    <label>Collection<select class="form-control" name="coll_id" style="min-width: 190px;">
                            <?php
                            $collections = get_collections();
                            
                            foreach($collections as $coll){ ?>
                                <option value="<?php echo $coll->id; ?>"><?php echo $coll->name; ?></option>
                            <?php } ?>
                        </select></label>
                </div>
                <div class="form-group">
                    <label>Number in collection<input type="number" class="form-control" name="id" value="" placeholder="1"></label>
                </div>
                <div class="form-group">
                    <label>Item name<input type="text" class="form-control" name="item_name" value="" placeholder="Your item name..."></label>
                </div>
                <div class="form-group">
                    <label>Number of steps<input type="number" class="form-control" name="nr_steps" value="" placeholder="100000"></label>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-primary" name="create_item" value="Create">
                </div>
            </form>
        </div>
    </div>
</div>