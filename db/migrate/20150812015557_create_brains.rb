class CreateBrains < ActiveRecord::Migration
  def self.up
    create_table :brains do |t|
      t.integer :zombie_id
      t.string :status
      t.string :flavor

      t.timestamp
    end
    add_index :brains, :zombie_id
  end


  def self.down
    drop_table :brains
  end
end
