class Support < ActiveRecord::Base
  has_many :cloths
  has_many :zombies, :through => :cloths, :source => :zombie
  self.include_root_in_json = false

end