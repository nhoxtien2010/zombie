class CreateCloths < ActiveRecord::Migration
  def self.up
    create_table :cloths do |t|
      t.integer :zombie_id
      t.integer :support_id

      t.timestamps
    end
  end

  def self.down
    drop_table :cloths
  end
end
