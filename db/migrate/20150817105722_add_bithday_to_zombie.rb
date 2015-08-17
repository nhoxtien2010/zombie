class AddBithdayToZombie < ActiveRecord::Migration
  def self.up
    add_column :zombies, :birthday, :date
    remove_column :zombies, :age
  end

  def self.down
    remove_column :zombies, :birthday
    add_column :zombies, :age, :integer
  end
end
