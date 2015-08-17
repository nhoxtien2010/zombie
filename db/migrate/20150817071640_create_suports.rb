class CreateSuports < ActiveRecord::Migration
  def self.up
    create_table :supports do |t|
      t.string :name
      t.integer :price
      t.integer :attack
      t.integer :speed
      t.integer :defence
      t.references :zombie
    end
  end

  def self.down
    drop_table :supports
  end
end
